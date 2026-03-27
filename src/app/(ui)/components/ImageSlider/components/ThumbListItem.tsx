import { classNames } from '@/utils/classnames';
import Image from 'next/image';
import type { FC } from 'react';
import css from './ThumbListItem.module.scss';

interface ThumbListItemProps {
  onSelection?: () => void;
  thumbUrl: string;
  isActive: boolean;
}

export const ThumbListItem: FC<ThumbListItemProps> = ({
  thumbUrl,
  onSelection,
  isActive,
}) => {
  return (
    <div
      className={classNames(css.container, {
        [css.active]: isActive,
      })}
      onClick={onSelection}
    >
      <Image
        className={css.thumbnail}
        src={thumbUrl}
        alt='Description of image'
        fill={true}
        style={{ objectFit: 'cover' }}
        loading='eager'
        sizes={'100%'}
      />
    </div>
  );
};
