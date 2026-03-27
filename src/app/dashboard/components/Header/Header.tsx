import { ImageSlider } from '@/app/(ui)/components/ImageSlider/ImageSlider';
import { Button, Typography } from '@mui/material';
import type { FC } from 'react';
import { BiSave } from 'react-icons/bi';
import css from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={css.header}>
      <div className={css.wrapper}>
        <div className={css.flexContainer}>
          <div className={css.headerContainer}>
            <Typography className={css.title}>Skyline Penthouse</Typography>
            <Typography className={css.subtitle}>REF-892</Typography>
          </div>
          <div className={css.headerActions}>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<BiSave />}
            >
              Save
            </Button>
          </div>
        </div>
        <ImageSlider createMode/>
      </div>
    </div>
  );
};
