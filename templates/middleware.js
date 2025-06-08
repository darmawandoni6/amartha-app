const templateMiddleware = () => {
  return `
  import { NextResponse } from 'next/server';

  // NOTE: Should handle httpOnly cookie later for security
  export const middleware = async () => {
    const responseNext = NextResponse.next();
  
    return responseNext;
  };
  
  export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|health).*)'],
  };
  `;
};

export default templateMiddleware;
