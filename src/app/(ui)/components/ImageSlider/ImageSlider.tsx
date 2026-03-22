'use client';
import { AnimatePresence } from 'motion/react';
import { useState, type FC } from 'react';
import css from './ImageSlider.module.scss';
import { Controls } from './components/Controls/Controls';
import { Slide } from './components/Slide';
import { ThumbListItem } from './components/ThumbListItem';

const mockImages = ['/penthouse.jpg', '/bedroom.jpg', '/bathroom.jpg'];

export const ImageSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const onThumbSelection = (thumbIdx: number) => setCurrentIndex(thumbIdx);

  const controlHandler = (move: 'back' | 'next') => {
    setCurrentIndex((prevIndex) => {
      if (move === 'next') {
        return prevIndex === mockImages.length - 1 ? 0 : prevIndex + 1;
      }
      if (move === 'back') {
        return prevIndex === 0 ? mockImages.length - 1 : prevIndex - 1;
      }
      return prevIndex;
    });
  };

  return (
    <div className={css.container}>
      <div
        className={css.imageContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          <Slide
            key={mockImages[currentIndex]}
            imageUrl={mockImages[currentIndex]}
          />
          <Controls
            show={isHovered}
            onNext={() => controlHandler('next')}
            onBack={() => controlHandler('back')}
          />
        </AnimatePresence>
      </div>
      <div className={css.thumbContainer}>
        <div className={css.thumbList}>
          {mockImages.map((thumbUrl, idx) => (
            <ThumbListItem
              key={thumbUrl}
              thumbUrl={thumbUrl}
              isActive={idx === currentIndex}
              onSelection={() => onThumbSelection(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
