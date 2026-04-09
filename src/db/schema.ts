import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'active',
  'draft',
  'archived',
  'published',
]);
export const propertyTypeEnum = pgEnum('property_type', [
  'apartment',
  'house',
  'villa',
  'studio',
  'commercial',
  'land',
]);
export const currencyEnum = pgEnum('currency', ['EUR', 'USD', 'GBP']);

const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
};

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number'),
  mobileNum: text('mobile_num'),
  role: text('role').notNull().default('user'),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});

export const offersTable = pgTable('offers', {
  id: uuid('id').defaultRandom().primaryKey(),
  refCode: text('ref_code').notNull().unique(),
  title: text('title').notNull(),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  currency: currencyEnum('currency').notNull().default('EUR'),
  status: statusEnum('status').notNull().default('draft'),
  createdBy: integer('created_by')
    .references(() => usersTable.id),
  updatedBy: integer('updated_by').references(() => usersTable.id),
  ...timestamps,
});

export const offerDetailsTable = pgTable('offer_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  offerId: uuid('offer_id')
    .notNull()
    .references(() => offersTable.id, { onDelete: 'cascade' }),
  propertyType: propertyTypeEnum('property_type').notNull(),
  bedrooms: integer('bedrooms').notNull().default(0),
  bathrooms: integer('bathrooms').notNull().default(0),
  surfaceSqm: numeric('surface_sqm', { precision: 8, scale: 2 }),
  floor: integer('floor'),
  totalFloors: integer('total_floors'),
  yearBuilt: integer('year_built'),
  parkingSpaces: integer('parking_spaces').default(0),
  description: text('description'),
  features: jsonb('features').$type<string[]>().default([]),
  ...timestamps,
});

export const addressesTable = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  offerId: uuid('offer_id')
    .notNull()
    .references(() => offersTable.id, { onDelete: 'cascade' }),
  street: text('street').notNull(),
  streetNumber: text('street_number'),
  city: text('city').notNull(),
  postalCode: text('postal_code'),
  region: text('region'),
  country: text('country').notNull().default('Greece'),
  lat: numeric('lat', { precision: 10, scale: 7 }),
  lng: numeric('lng', { precision: 10, scale: 7 }),
  ...timestamps,
});

export const offerImagesTable = pgTable('offer_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  offerId: uuid('offer_id')
    .notNull()
    .references(() => offersTable.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  thumbUrl: text('thumb_url'),
  isMain: boolean('is_main').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  altText: text('alt_text'),
  ...timestamps,
});

export const sliderMarkersTable = pgTable('slider_markers', {
  id: uuid('id').defaultRandom().primaryKey(),
  imageId: uuid('image_id')
    .notNull()
    .references(() => offerImagesTable.id, { onDelete: 'cascade' }),
  x: numeric('x', { precision: 5, scale: 4 }).notNull(),
  y: numeric('y', { precision: 5, scale: 4 }).notNull(),
  label: text('label'),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertOffer = typeof offersTable.$inferInsert;
export type SelectOffer = typeof offersTable.$inferSelect;

export type InsertOfferDetails = typeof offerDetailsTable.$inferInsert;
export type SelectOfferDetails = typeof offerDetailsTable.$inferSelect;

export type InsertAddress = typeof addressesTable.$inferInsert;
export type SelectAddress = typeof addressesTable.$inferSelect;

export type InsertOfferImage = typeof offerImagesTable.$inferInsert;
export type SelectOfferImage = typeof offerImagesTable.$inferSelect;

export type InsertSliderMarker = typeof sliderMarkersTable.$inferInsert;
export type SelectSliderMarker = typeof sliderMarkersTable.$inferSelect;
