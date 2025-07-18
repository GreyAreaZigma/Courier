'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import FedExFooter from '@/components/footer';

export default function LoginPage() {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [rememberUserId, setRememberUserId] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const userIdInput = document.getElementById('userId');
		const passwordInput = document.getElementById('password');
		const userIdBorder = document.getElementById('userId-border');
		const passwordBorder = document.getElementById('password-border');

		const handleFocus = (borderElement: HTMLElement | null) => {
			if (borderElement) {
				borderElement.style.height = '100%';
				borderElement.style.transform = 'scaleY(1)';
			}
		};

		const handleBlur = (borderElement: HTMLElement | null) => {
			if (borderElement) {
				borderElement.style.height = '0%';
				borderElement.style.transform = 'scaleY(0)';
			}
		};

		userIdInput?.addEventListener('focus', () => handleFocus(userIdBorder));
		userIdInput?.addEventListener('blur', () => handleBlur(userIdBorder));
		passwordInput?.addEventListener('focus', () => handleFocus(passwordBorder));
		passwordInput?.addEventListener('blur', () => handleBlur(passwordBorder));

		return () => {
			userIdInput?.removeEventListener('focus', () =>
				handleFocus(userIdBorder)
			);
			userIdInput?.removeEventListener('blur', () => handleBlur(userIdBorder));
			passwordInput?.removeEventListener('focus', () =>
				handleFocus(passwordBorder)
			);
			passwordInput?.removeEventListener('blur', () =>
				handleBlur(passwordBorder)
			);
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// Basic validation
		if (!userId.trim() || !password.trim()) {
			setError('Please enter both User ID and Password');
			setLoading(false);
			return;
		}

		try {
			// Determine if userId is an email or custom user ID
			const isEmail = userId.includes('@');
			const loginIdentifier = isEmail ? userId : userId;

			const result = await signIn('credentials', {
				email: loginIdentifier, // For now, we'll use email field for both
				password,
				redirect: false,
			});

			if (result?.error) {
				setError(
					'Invalid user ID or password. Please check your credentials and try again.'
				);
			} else {
				// Check user role and redirect accordingly
				const session = await getSession();
				if (session?.user?.role === 'admin') {
					router.push('/admin');
				} else {
					router.push('/');
				}
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('An error occurred during login. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Nav />

			<main className="flex-1 max-w-7xl mx-auto pt-16 px-4">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-light text-gray-800 mb-6">
						Enter your user ID and password to log in
					</h1>

					<Link
						href="/signup"
						className="text-blue-600 hover:text-blue-700 font-medium text-sm tracking-wide"
					>
						CREATE A USER ID
					</Link>
				</div>

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
					{error && (
						<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
							{error}
						</div>
					)}

					{/* User ID Field */}
					<div>
						<label
							htmlFor="userId"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							User ID
						</label>
						<div className="relative">
							<input
								type="text"
								id="userId"
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								required
								className="w-full px-3 py-3 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 relative"
							/>
							<div
								className="absolute left-0 top-0 w-1 bg-orange-500 transition-all duration-300 ease-out"
								style={{
									height: '0%',
									transform: 'scaleY(0)',
									transformOrigin: 'top',
								}}
								id="userId-border"
							/>
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path
										d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"
										fill="#dc2626"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Password Field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-3 py-3 pr-20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 relative"
							/>
							<div
								className="absolute left-0 top-0 w-1 bg-orange-500 transition-all duration-300 ease-out"
								style={{
									height: '0%',
									transform: 'scaleY(0)',
									transformOrigin: 'top',
								}}
								id="password-border"
							/>
							<div className="absolute right-0 top-0 h-full flex">
								<div className="border-l border-gray-300 w-10 flex items-center justify-center">
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="text-blue-500 hover:text-blue-700"
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											{showPassword ? (
												<>
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
													<circle cx="12" cy="12" r="3" />
												</>
											) : (
												<>
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
													<circle cx="12" cy="12" r="3" />
												</>
											)}
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Remember User ID Checkbox */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="remember"
							checked={rememberUserId}
							onChange={(e) => setRememberUserId(e.target.checked)}
							className="w-4 h-4 text-blue-600 border-2 border-blue-600 focus:ring-blue-500"
						/>
						<label htmlFor="remember" className="ml-3 text-sm text-gray-700">
							Remember my user ID.
						</label>
					</div>

					{/* Login Button */}
					<div className="pt-4">
						<button
							type="submit"
							disabled={loading || !userId.trim() || !password.trim()}
							className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 text-sm tracking-wide"
						>
							{loading ? 'SIGNING IN...' : 'LOG IN'}
						</button>
					</div>

					{/* Forgot Password Link */}
					<div className="text-center pt-4">
						<a
							href="#"
							className="text-blue-600 hover:text-blue-700 text-sm font-medium"
						>
							FORGOT YOUR USER ID OR PASSWORD?
						</a>
					</div>
				</form>
			</main>

			<FedExFooter />
		</div>
	);
}
