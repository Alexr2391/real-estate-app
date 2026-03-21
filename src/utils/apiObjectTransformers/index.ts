import { ApiResponseErrors, FetchApiReponse } from '@/types';
import { NextResponse } from 'next/server';

interface ApiFormatterResponse<T> {
  status: number;
  data: T;
  success: true;
}

export const NextAPIResponseTransformer = <T = null>(
  response: FetchApiReponse<T> | T,
  castStatus: number = 200
) => {
  if (
    typeof response === 'object' &&
    response &&
    'success' in response &&
    response.success
  )
    return NextResponse.json<ApiFormatterResponse<T>>(
      {
        status: response.status,
        data: response.data,
        success: response.success,
      },
      { status: response.status }
    );
  return NextResponse.json<ApiFormatterResponse<typeof response>>(
    {
      status: castStatus,
      data: response,
      success: true,
    },
    { status: castStatus }
  );
};

export const NextAPIErrorTransformer = (
  error: unknown | ApiResponseErrors | Error,
  castStatus: number = 500
) => {
  const errorObj = error as unknown as ApiResponseErrors | Error;
  if ('details' in errorObj) {
    return NextResponse.json(errorObj, { status: errorObj.status });
  }
  return NextResponse.json(
    { status: castStatus, details: String(error), success: false },
    { status: castStatus }
  );
};
