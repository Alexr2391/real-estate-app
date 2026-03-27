import { motion } from 'framer-motion';
import { FC, RefObject } from 'react';
import css from './SliderTag.module.scss';

interface SliderTagProps {
  datapoint: { x: number; y: number };
  containerRef: RefObject<HTMLDivElement | null>;
  isDraggable?: boolean;
}

export const SliderTag: FC<SliderTagProps> = ({
  datapoint,
  containerRef,
  isDraggable = true,
}) => {
  return (
    <motion.div
      className={css.container}
      style={{ top: datapoint.x * 100, left: datapoint.y * 100 }}
      drag={isDraggable}
      dragConstraints={containerRef}
      dragMomentum={false}
    ></motion.div>
  );
};
