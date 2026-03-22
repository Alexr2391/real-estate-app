import { motion } from 'motion/react';
import Image from 'next/image';
import type { FC } from 'react';
import css from './Slide.module.scss';

interface SlideProps {
  imageUrl: string;
}

export const Slide: FC<SlideProps> = ({ imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 2 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 2 }}
      transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
      className={css.animationDiv}
    >
      <Image
        className={css.image}
        src={imageUrl}
        alt='Description of image'
        fill={true}
        style={{ objectFit: 'cover' }}
        sizes={'100%'}
      />
    </motion.div>
  );
};
