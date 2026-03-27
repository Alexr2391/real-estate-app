import { List } from '@mui/material';
import type { FC } from 'react';
import css from './SideNavList.module.scss';
import { SideNavListItem } from './SideNavListItem/SideNavListItem';
import type { SideNavListItemProps } from './types';

const mockImage = '/penthouse.jpg';

export const SideNavList: FC & { Item: FC<SideNavListItemProps> } = () => {
  return (
    <List className={css.sideNavList}>
      <SideNavList.Item
        imageUrl={mockImage}
        status='active'
        id='REF-1284'
        description='Skyline Penthouse'
        price='200.000€'
        address='Νεα Ιωνία                                      212123333333333333333333333333333333333333333333333333333333'
      />
    </List>
  );
};

SideNavList.Item = SideNavListItem;
