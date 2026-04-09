import { and, eq } from 'drizzle-orm';
import { db } from '..';
import { addressesTable, offerImagesTable, offersTable } from '../schema';

export const getOffersList = async () => {
  return db
    .select({
      id: offersTable.id,
      refCode: offersTable.refCode,
      title: offersTable.title,
      price: offersTable.price,
      currency: offersTable.currency,
      status: offersTable.status,
      mainImageUrl: offerImagesTable.url,
      mainThumbUrl: offerImagesTable.thumbUrl,
      street: addressesTable.street,
      streetNumber: addressesTable.streetNumber,
      city: addressesTable.city,
    })
    .from(offersTable)
    .leftJoin(
      offerImagesTable,
      and(
        eq(offerImagesTable.offerId, offersTable.id),
        eq(offerImagesTable.isMain, true)
      )
    )
    .leftJoin(addressesTable, eq(addressesTable.offerId, offersTable.id));
};
