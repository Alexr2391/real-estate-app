'use client';
import { markers } from '@/data/mockMarkers';
import { autoFitToCanvas, loadImage, needsCenteringModal } from '@/utils/imageCanvas';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState, type FC } from 'react';
import { FileInput } from '../common/FileInput/FileInput';
import { ImageCenterModal } from '../common/ImageCenterModal/ImageCenterModal';
import { UploadZone } from '../common/UploadZone/UploadZone';
import { SliderTag } from '../SliderTag/SliderTag';
import css from './ImageSlider.module.scss';
import { AddThumbButton } from './components/AddThumbButton/AddThumbButton';
import { Controls } from './components/Controls/Controls';
import { Slide } from './components/Slide';
import { ThumbListItem } from './components/ThumbListItem';

const mockImages = ['/penthouse.jpg', '/bedroom.jpg', '/bathroom.jpg'];

interface ImageSliderProps {
  createMode?: boolean;
  initialImages?: string[];
}

export const ImageSlider: FC<ImageSliderProps> = ({
  createMode = false,
  initialImages,
}) => {
  const [images, setImages] = useState<string[]>(
    initialImages ?? (createMode ? [] : mockImages)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pendingImage, setPendingImage] = useState<HTMLImageElement | null>(null);
  const constraintRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onThumbSelection = (idx: number) => setCurrentIndex(idx);

  const controlHandler = (move: 'back' | 'next') => {
    setCurrentIndex((prev) => {
      if (move === 'next') return prev === images.length - 1 ? 0 : prev + 1;
      if (move === 'back') return prev === 0 ? images.length - 1 : prev - 1;
      return prev;
    });
  };

  const pushImage = (blob: Blob) => {
    const previewUrl = URL.createObjectURL(blob);
    setImages((prev) => {
      setCurrentIndex(prev.length);
      return [...prev, previewUrl];
    });
  };

  const handleFileSelected = async (file: File) => {
    const img = await loadImage(file);

    if (needsCenteringModal(img)) {
      setPendingImage(img);
    } else {
      const blob = await autoFitToCanvas(img);
      pushImage(blob);
      URL.revokeObjectURL(img.src);
    }
  };

  const handleModalConfirm = (blob: Blob) => {
    pushImage(blob);
    if (pendingImage) URL.revokeObjectURL(pendingImage.src);
    setPendingImage(null);
  };

  const handleModalCancel = () => {
    if (pendingImage) URL.revokeObjectURL(pendingImage.src);
    setPendingImage(null);
  };

  const openFilePicker = () => fileInputRef.current?.click();
  const isEmpty = images.length === 0;

  return (
    <div className={css.container}>
      <motion.div
        ref={constraintRef}
        className={css.imageContainer}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {createMode && isEmpty ? (
          <UploadZone onDrop={handleFileSelected} onBrowse={openFilePicker} />
        ) : (
          <AnimatePresence>
            <Slide key={images[currentIndex]} imageUrl={images[currentIndex]} />
            <Controls
              show={isHovered}
              onNext={() => controlHandler('next')}
              onBack={() => controlHandler('back')}
            />
          </AnimatePresence>
        )}
        {!isEmpty &&
          markers.map((datapoint, id) => (
            <SliderTag key={id} datapoint={datapoint} containerRef={constraintRef} />
          ))}
      </motion.div>
      <div className={css.thumbContainer}>
        <div className={css.thumbList}>
          {images.map((thumbUrl, idx) => (
            <ThumbListItem
              key={thumbUrl}
              thumbUrl={thumbUrl}
              isActive={idx === currentIndex}
              onSelection={() => onThumbSelection(idx)}
            />
          ))}
          {createMode && <AddThumbButton onClick={openFilePicker} />}
        </div>
      </div>
      {createMode && (
        <>
          <FileInput ref={fileInputRef} onChange={handleFileSelected} />
          <ImageCenterModal
            key={pendingImage?.src ?? 'modal'}
            image={pendingImage}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        </>
      )}
    </div>
  );
};
