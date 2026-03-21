'use client';

import { Button } from '@mui/material';
import { FC } from 'react';
import { SideNavList } from '../SideNavList/SideNavList';
import css from './SideNav.module.scss';

export const SideNav: FC = () => {
  return (
    <aside className={css.sideNavContainer}>
      <Button></Button>
      <div className={css.list}>
        <SideNavList />
      </div>
    </aside>
  );
};
