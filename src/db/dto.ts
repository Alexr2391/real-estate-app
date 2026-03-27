
import type {
  SelectAddress,
  SelectOffer,
  SelectOfferDetails,
  SelectOfferImage,
  SelectSliderMarker,
} from './schema';


export type SliderMarkerDto = Pick<SelectSliderMarker, 'id' | 'x' | 'y' | 'label' | 'sortOrder'>;

export type OfferImageDto = Pick<
  SelectOfferImage,
  'id' | 'url' | 'isMain' | 'sortOrder' | 'altText'
> & {
  markers: SliderMarkerDto[];
};


export type OfferListItemDto = Pick<SelectOffer, 'id' | 'refCode' | 'title' | 'price' | 'currency' | 'status'> & {
  mainImageUrl: string;
  address: Pick<SelectAddress, 'street' | 'streetNumber' | 'city' | 'postalCode'>;
};


export type OfferDetailDto = SelectOffer & {
  details: SelectOfferDetails | null;
  address: SelectAddress | null;
  images: OfferImageDto[];    
};


export type CreateOfferPayload = Omit<SelectOffer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'updatedBy'> & {
  details: Omit<SelectOfferDetails, 'id' | 'offerId' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
  address: Omit<SelectAddress, 'id' | 'offerId' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
};

export type UpdateOfferPayload = Partial<CreateOfferPayload>;
