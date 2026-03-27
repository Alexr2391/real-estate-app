import { Methods } from '@/types';

const { POST, GET } = Methods;

export const endpoints = {
  uploadImage: {
    path: 'upload?key={key}',
    method: POST,
    response: {} as string,
    headers: {},
  },
  users: {
    path: 'users?id={id}',
    method: GET,
    response: '' as string,
    headers: {},
  },
} as const;
