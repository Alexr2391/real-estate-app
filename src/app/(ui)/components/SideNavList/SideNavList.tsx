'use client';
import { useGetOffersQuery } from '@/lib/api/offersApi';
import { formatAddress, formatPrice } from '@/utils/formatters';
import { List } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { itemVariants } from './constants';
import css from './SideNavList.module.scss';
import { SideNavListItem } from './SideNavListItem/SideNavListItem';
import { SideNavListItemSkeleton } from './SideNavListItem/SideNavListItemSkeleton';
import type { SideNavListItemProps } from './types';

const SideNavListBase = () => {
  const { data: offers = [], isFetching } = useGetOffersQuery();

  return (
    <List className={css.sideNavList}>
      <SideNavListItem
        imageUrl='/penthouse.jpg'
        status='active'
        id='REF-1284'
        description='Skyline Penthouse'
        price='200.000€'
        address='Νεα Ιωνία'
      />
      <AnimatePresence mode='popLayout'>
        {isFetching
          ? Array.from({ length: 2 }, (_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <SideNavListItemSkeleton />
              </motion.div>
            ))
          : offers.map((offer) => (
              <motion.div
                key={offer.id}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                layout
              >
                <SideNavListItem
                  imageUrl={offer.mainThumbUrl ?? offer.mainImageUrl}
                  status={offer.status}
                  id={offer.refCode}
                  description={offer.title}
                  price={formatPrice(offer.price, offer.currency)}
                  address={formatAddress(
                    offer.street,
                    offer.streetNumber,
                    offer.city
                  )}
                />
              </motion.div>
            ))}
      </AnimatePresence>
    </List>
  );
};

export const SideNavList = Object.assign(SideNavListBase, {
  Item: SideNavListItem,
}) as typeof SideNavListBase & { Item: React.FC<SideNavListItemProps> };
