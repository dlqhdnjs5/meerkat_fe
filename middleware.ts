import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/test')) {
        if (!req.cookies.get('access_token')) {
            return NextResponse.redirect(new URL('/login?status=NONE', req.url));
        }
    }
}