import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),

  name: text('name').notNull(),

  lastName: text('last_name').notNull(),

  email: text('email').notNull().unique(),

  phoneNumber: text('phone_number'),

  mobileNum: text('mobile_num'),

  role: text('role').notNull().default('user'),

  isActive: boolean('is_active').default(true),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at').defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
