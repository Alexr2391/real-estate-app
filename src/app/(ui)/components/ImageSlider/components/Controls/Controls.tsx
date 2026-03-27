import { classNames } from '@/utils/classnames';
import { IconButton } from '@mui/material';
import { motion } from 'motion/react';
import type { FC } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import css from './Controls.module.scss';

interface ControlsProps {
  onBack?: () => void;
  onNext?: () => void;
  show: boolean;
}

export const Controls: FC<ControlsProps> = ({ onBack, onNext, show }) => {
  return (
    show && (
      <motion.div
        className={css.controlsLayer}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      >
        <IconButton onClick={onBack} className={classNames(css.controlBtn)}>
          <BsChevronLeft className={css.icon} />
        </IconButton>
        <IconButton onClick={onNext} className={classNames(css.controlBtn)}>
          <BsChevronRight className={css.icon} />
        </IconButton>
      </motion.div>
    )
  );
};
