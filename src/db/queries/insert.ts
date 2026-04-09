import { db } from '..';
import {
  usersTable,
  offersTable,
  offerImagesTable,
  type InsertUser,
  type InsertOffer,
  type InsertOfferImage,
} from '../schema';

export const createUser = async (data: InsertUser) => {
  try {
    const response = await db.insert(usersTable).values(data);
    return response;
  } catch (err) {
    console.error(String(err));
  }
};

export const createDraftOffer = async (
  data: Omit<InsertOffer, 'status' | 'createdBy'>
) => {
  const [offer] = await db
    .insert(offersTable)
    .values({ ...data, status: 'draft' })
    .returning();
  return offer;
};

export const createOfferImages = async (images: InsertOfferImage[]) => {
  return db.insert(offerImagesTable).values(images).returning();
};
