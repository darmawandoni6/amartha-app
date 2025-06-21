import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)'],
};
