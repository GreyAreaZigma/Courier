import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

		// Protect admin routes
		if (isAdminRoute && token?.role !== 'admin') {
			return NextResponse.redirect(new URL('/login', req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = {
	matcher: ['/admin/:path*'],
};
