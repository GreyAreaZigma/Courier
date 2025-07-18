'use client';
import SignupForm from '@/components/SignupForm';
import Nav from '@/components/Nav';
import FedExFooter from '@/components/footer';

export default function SignupPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Nav />

			<main className="flex-1">
				<SignupForm />
			</main>

			<FedExFooter />
		</div>
	);
}
