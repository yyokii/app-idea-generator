import { NextResponse } from 'next/server'

export function makeBadRequestErrorResponse(errorDetail: string): NextResponse {
  return new NextResponse(JSON.stringify({ error: `${errorDetail}` }), {
    status: 400,
    statusText: 'Bad Request.',
  })
}

export function makeUnauthorizedErrorResponse(errorDetail: string): NextResponse {
  return new NextResponse(JSON.stringify({ error: `${errorDetail}` }), {
    status: 401,
    statusText: 'Unauthorized.',
  })
}

export function makeNotFoundErrorResponse(errorDetail: string): NextResponse {
  return new NextResponse(JSON.stringify({ error: `${errorDetail}` }), {
    status: 404,
    statusText: 'Not Found.',
  })
}

export function makeInternalServerErrorResponse(errorDetail: string): NextResponse {
  return new NextResponse(JSON.stringify({ error: `${errorDetail}` }), {
    status: 500,
    statusText: 'Internal Server Error.',
  })
}

export function makeNotImplementedErrorResponse(errorDetail: string): NextResponse {
  return new NextResponse(JSON.stringify({ error: `${errorDetail}` }), {
    status: 500,
    statusText: 'Not Implemented.',
  })
}
