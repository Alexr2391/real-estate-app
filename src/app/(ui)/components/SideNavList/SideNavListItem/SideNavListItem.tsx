'use client';
import { StatusTag } from '@/app/StatusTag/StatusTag';
import { useAppDispatch } from '@/lib/hooks';
import { setSelection } from '@/lib/slices/sidenavSlice';
import { ListItem } from '@mui/material';
import Image from 'next/image';
import { type FC } from 'react';
import { BiExpand } from 'react-icons/bi';
import type { SideNavListItemProps } from '../types';
import css from './SideNavListItem.module.scss';

export const SideNavListItem: FC<SideNavListItemProps> = ({
  status,
  imageUrl,
  id,
  description,
  price,
  address,
}) => {
  const dispatch = useAppDispatch();

  return (
    <ListItem
      className={css.listItem}
      onClick={() => dispatch(setSelection({ id }))}
    >
      <div className={css.listItemFlex}>
        <div className={css.thumbPlaceholder}>
          <div className={css.expandOverlay}>
            <BiExpand className={css.expandIcon} />
          </div>
          <Image
            src={imageUrl}
            alt='Description of image'
            fill={true}
            style={{ objectFit: 'cover' }}
            loading='eager'
            sizes={'100%'}
          />
        </div>
        <div className={css.listItemInfoContainer}>
          <div className={css.listHeader}>
            <div className={css.listItemCode}>{id}</div>
            <StatusTag type={status} />
          </div>

          <div className={css.description}>{description}</div>
          <div className={css.address}>{address}</div>
          <div className={css.price}>{price}</div>
        </div>
      </div>
    </ListItem>
  );
};
