import type { StatusValues } from '@/types';

export interface SideNavListItemProps {
  imageUrl?: string | null;
  status: StatusValues;
  id: string;
  description: string;
  price: string;
  address?: string | null;
}
