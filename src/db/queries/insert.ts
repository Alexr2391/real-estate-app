import { db } from '..';
import { usersTable, type InsertUser } from '../schema';

export const createUser = async (data: InsertUser) => {
  try {
    const response = await db.insert(usersTable).values(data);
    return response;
  } catch (err) {
    console.error(String(err));
  }
};
