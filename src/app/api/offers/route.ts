import { createDraftOffer, createOfferImages } from '@/db/queries/insert';
import { getOffersList } from '@/db/queries/select';
import {
  NextAPIErrorTransformer,
  NextAPIResponseTransformer,
} from '@/utils/apiObjectTransformers';
import { NextRequest } from 'next/server';

interface CreateDraftBody {
  images: { url: string; thumbUrl: string | null }[];
}

export async function GET() {
  try {
    const offers = await getOffersList();
    return NextAPIResponseTransformer(offers);
  } catch (err) {
    console.error('[GET /api/offers]', err);
    return NextAPIErrorTransformer(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { images }: CreateDraftBody = await request.json();

    const offer = await createDraftOffer({
      refCode: crypto.randomUUID(),
      title: 'Untitled',
      price: '0',
      currency: 'EUR',
    });

    if (images.length > 0) {
      await createOfferImages(
        images.map(({ url, thumbUrl }, i) => ({
          offerId: offer.id,
          url,
          thumbUrl,
          isMain: i === 0,
          sortOrder: i,
        }))
      );
    }

    return NextAPIResponseTransformer({ id: offer.id }, 201);
  } catch (err) {
    console.error('[POST /api/offers]', err);
    return NextAPIErrorTransformer(err);
  }
}
