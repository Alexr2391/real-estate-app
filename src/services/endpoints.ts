import { Methods } from '@/types';

const { POST, GET } = Methods;

export const endpoints = {
  uploadImage: {
    path: 'upload?key={key}',
    method: POST,
    response: {} as { url: string; display_url: string; thumb: { url: string } | null },
    headers: {},
  },
  users: {
    path: 'users?id={id}',
    method: GET,
    response: '' as string,
    headers: {},
  },
  uploadOfferImage: {
    path: 'offers/images/upload',
    method: POST,
    body: {} as { image: string },
    response: {} as { url: string; thumbUrl: string | null },
    headers: {},
  },
  createOffer: {
    path: 'offers',
    method: POST,
    body: {} as { images: Array<{ url: string; thumbUrl: string | null }> },
    response: {} as { id: string },
    headers: {},
  },
} as const;
