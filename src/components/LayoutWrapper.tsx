'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Nav';
import Footer from './footer';

interface LayoutWrapperProps {
	children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
	const pathname = usePathname();
	const isAuthPage = pathname === '/login' || pathname === '/signup';

	return (
		<div className="min-h-screen flex flex-col">
			{/* Navbar - hidden on auth pages */}
			{!isAuthPage && <Navbar />}

			{/* Main content */}
			<main className="flex-1">{children}</main>

			{/* Footer - hidden on auth pages */}
			{!isAuthPage && <Footer />}
		</div>
	);
}
