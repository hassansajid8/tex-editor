import React from 'react'
import { cookies } from 'next/headers';

const middleware = (request) => {
    const cookieStore = cookies();
    const currentUser = cookieStore.get('user')?.value;

    if(currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/dashboard', request.url))
    }

    if (!currentUser && request.nextUrl.pathname != '/') {
        return Response.redirect(new URL('/', request.url))
      }
}

export default middleware

export const config = {
    matcher: ["/", "/dashboard", "/dashboard/project", "/dashboard/project/:path*"],
    };