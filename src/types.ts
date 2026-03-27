export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface ApiResponseErrors {
  details: string;
  status: number;
  success: false;
}

export interface FetchApiReponse<T> {
  data: T;
  status: number;
  success: true;
}

export enum STATUS {
  ACTIVE = 'active',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

export type StatusValues = `${STATUS}`;
