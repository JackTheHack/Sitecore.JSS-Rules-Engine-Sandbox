import type { NextRequest, NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  return middleware(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. all root files inside /public (e.g. /favicon.ico)
   */
  //runtime: 'experimental-edge', // for Edge API Routes only
  unstable_allowDynamic: [
    '/node_modules/lodash.unescape/**', // use a glob to allow anything in the function-bind 3rd party module
    '/node_modules/@sitecore-jss/**'
  ],
  matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|[\\w-]+\\.\\w+).*)'],
};
