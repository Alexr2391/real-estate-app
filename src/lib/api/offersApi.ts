import type { StatusValues } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OfferListItem {
  id: string;
  refCode: string;
  title: string;
  price: string;
  currency: string;
  status: StatusValues;
  mainImageUrl: string | null;
  mainThumbUrl: string | null;
  street: string | null;
  streetNumber: string | null;
  city: string | null;
}

export const offersApi = createApi({
  reducerPath: 'offersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Offers'],
  endpoints: (builder) => ({
    getOffers: builder.query<OfferListItem[], void>({
      query: () => 'offers',
      transformResponse: (res: { data: OfferListItem[] }) => res.data,
      providesTags: ['Offers'],
    }),
    createDraftOffer: builder.mutation<
      { id: string },
      { images: Array<{ url: string; thumbUrl: string | null }> }
    >({
      query: (body) => ({ url: 'offers', method: 'POST', body }),
      transformResponse: (res: { data: { id: string } }) => res.data,
      invalidatesTags: ['Offers'],
    }),
  }),
});

export const { useGetOffersQuery, useCreateDraftOfferMutation } = offersApi;
