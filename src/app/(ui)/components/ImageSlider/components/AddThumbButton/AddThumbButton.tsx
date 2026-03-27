import type { FC } from 'react';
import { MdAdd } from 'react-icons/md';
import css from './AddThumbButton.module.scss';

interface AddThumbButtonProps {
  onClick: () => void;
}

export const AddThumbButton: FC<AddThumbButtonProps> = ({ onClick }) => (
  <div className={css.container} onClick={onClick}>
    <MdAdd className={css.icon} />
  </div>
);
