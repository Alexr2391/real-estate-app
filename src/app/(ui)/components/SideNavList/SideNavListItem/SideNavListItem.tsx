'use client';
import { StatusTag } from '@/app/(ui)/components/common/StatusTag/StatusTag';
import { useAppDispatch } from '@/lib/hooks';
import { setSelection } from '@/lib/slices/sidenavSlice';
import { ListItem } from '@mui/material';
import Image from 'next/image';
import { useState, type FC } from 'react';
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
  const [imgLoaded, setImgLoaded] = useState(false);

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
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt='Description of image'
              fill={true}
              style={{ objectFit: 'cover', opacity: imgLoaded ? 1 : 0, transition: 'opacity 300ms ease-in-out' }}
              loading='eager'
              sizes={'100%'}
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className={css.imagePlaceholder} />
          )}
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
