'use client';
import { ImageSlider } from '@/app/(ui)/components/ImageSlider/ImageSlider';
import { MainButton } from '@/app/(ui)/components/common/Button/Button';
import { useCreateDraftOfferMutation } from '@/lib/api/offersApi';
import { call } from '@/services/call';
import { Typography } from '@mui/material';
import { useRef } from 'react';
import { BiSave } from 'react-icons/bi';
import css from './Header.module.scss';

export const Header = () => {
  const [createDraftOffer, { isLoading }] = useCreateDraftOfferMutation();
  const imagesRef = useRef<string[]>([]);
  const blobsRef = useRef<Map<string, Blob>>(new Map());

  const handleImagesChange = (images: string[], blobs: Map<string, Blob>) => {
    imagesRef.current = images;
    blobsRef.current = blobs;
  };

  const handleSave = async () => {
    const finalImages: Array<{ url: string; thumbUrl: string | null }> = [];

    for (const url of imagesRef.current) {
      const blob = blobsRef.current.get(url);
      if (!blob) {
        finalImages.push({ url, thumbUrl: null });
        continue;
      }

      const bytes = new Uint8Array(await blob.arrayBuffer());
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);

      const uploadResult = await call('uploadOfferImage', { body: { image: btoa(binary) } });
      if (!uploadResult.success) throw new Error(uploadResult.details);
      finalImages.push({ url: uploadResult.data.url, thumbUrl: uploadResult.data.thumbUrl });
    }

    await createDraftOffer({ images: finalImages });
  };

  return (
    <div className={css.header}>
      <div className={css.wrapper}>
        <div className={css.flexContainer}>
          <div className={css.headerContainer}>
            <Typography className={css.title}>Skyline Penthouse</Typography>
            <Typography className={css.subtitle}>REF-892</Typography>
          </div>
          <div className={css.headerActions}>
            <MainButton
              variant='contained'
              color='secondary'
              startIcon={<BiSave />}
              disabled={isLoading}
              onClick={handleSave}
            >
              Save
            </MainButton>
          </div>
        </div>
        <ImageSlider createMode onImagesChange={handleImagesChange} />
      </div>
    </div>
  );
};
