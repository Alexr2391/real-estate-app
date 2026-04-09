import { ListItem, Skeleton } from '@mui/material';
import css from './SideNavListItem.module.scss';
import skeletonCss from './SideNavListItemSkeleton.module.scss';

export const SideNavListItemSkeleton = () => (
  <ListItem className={css.listItem}>
    <div className={css.listItemFlex}>
      <Skeleton variant='rounded' width={64} height={64} className={skeletonCss.thumb} />
      <div className={css.listItemInfoContainer}>
        <div className={css.listHeader}>
          <Skeleton variant='text' width={72} height={16} />
          <Skeleton variant='rounded' width={52} height={20} />
        </div>
        <Skeleton variant='text' width='80%' height={20} />
        <Skeleton variant='text' width='55%' height={16} />
        <Skeleton variant='text' width='45%' height={16} />
      </div>
    </div>
  </ListItem>
);
