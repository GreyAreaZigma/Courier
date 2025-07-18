// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Nav';
import Footer from '@/components/footer';
import AuthProvider from '@/components/AuthProvider';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
	title: 'FedEx Delivery Management',
	description: 'FedEx delivery management system with admin dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased font-poppins">
				<AuthProvider>
					<LayoutWrapper>{children}</LayoutWrapper>
				</AuthProvider>
			</body>
		</html>
	);
}
