import { FC } from 'react';
import { SideNavList } from '../SideNavList/SideNavList';
import css from './SideNav.module.scss';
import { SideNavActions } from './components/SIdeNavActions/SideNavActions';
import { SideNavFilters } from './components/SideNavFilters/SideNavFilters';

export const SideNav: FC = () => {
  return (
    <aside className={css.sideNavContainer}>
      <div className={css.sideNavWrapper}>
        <SideNavActions />
        <SideNavFilters />
        <div className={css.list}>
          <SideNavList />
        </div>
      </div>
    </aside>
  );
};
