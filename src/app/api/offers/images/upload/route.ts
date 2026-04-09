import { call } from '@/services/call';
import { NextAPIErrorTransformer, NextAPIResponseTransformer } from '@/utils/apiObjectTransformers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image }: { image: string } = await request.json();

    const result = await call('uploadImage', {
      params: { key: process.env.IMBB_API_KEY! },
      rawBody: new URLSearchParams({ image }).toString(),
      contentType: 'application/x-www-form-urlencoded',
      serviceProvider: 'imbb',
    });

    if (!result.success) return NextAPIErrorTransformer(result, result.status);

    return NextAPIResponseTransformer({
      url: result.data.url,
      thumbUrl: result.data.thumb?.url ?? null,
    }, 201);
  } catch (err) {
    return NextAPIErrorTransformer(err);
  }
}
