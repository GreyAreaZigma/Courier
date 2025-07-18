'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
	const [showCustomUserId, setShowCustomUserId] = useState(false);
	const [showContactDetails, setShowContactDetails] = useState(false);
	const [showPasswordRequirements, setShowPasswordRequirements] =
		useState(false);
	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [country, setCountry] = useState('United States');
	const [address, setAddress] = useState('');
	const [countryCode, setCountryCode] = useState('+1');
	const [phone, setPhone] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [marketingUpdates, setMarketingUpdates] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleContinueClick = () => {
		if (password.trim()) {
			setShowContactDetails(true);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// Validate required fields
		if (!email || !password || !firstName || !lastName || !address || !phone) {
			setError('Please fill in all required fields');
			setLoading(false);
			return;
		}

		if (!termsAccepted) {
			setError('Please accept the Terms of Use');
			setLoading(false);
			return;
		}

		// Validate password requirements
		const passwordValidation = passwordRequirements.every((req) => req.met);
		if (!passwordValidation) {
			setError('Please ensure your password meets all requirements');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: `${firstName} ${lastName}`,
					email,
					password,
					// Additional fields for future use
					firstName,
					lastName,
					country,
					address,
					countryCode,
					phone,
					marketingUpdates,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Signup failed');
			}

			setSuccess(true);
			// Redirect to login page after successful signup
			setTimeout(() => {
				router.push('/login');
			}, 2000);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: 'An error occurred during signup'
			);
		} finally {
			setLoading(false);
		}
	};

	const passwordRequirements = [
		{ text: 'Be at least 12 characters', met: password.length >= 12 },
		{ text: 'Be at most 25 characters', met: password.length <= 25 },
		{ text: 'Include at least one number', met: /\d/.test(password) },
		{
			text: 'Include at least one uppercase letter',
			met: /[A-Z]/.test(password),
		},
		{
			text: 'Include at least one lowercase letter',
			met: /[a-z]/.test(password),
		},
		{
			text: 'Not contain 3 or more consecutive occurrences of the same character',
			met: !/(.)\1{2,}/.test(password),
		},
		{
			text: 'Not contain 3 or more consecutive alphabetic characters in sequence',
			met: true,
		},
		{
			text: 'Not contain spaces, ~, single quotes, double quotes, < or >',
			met: !/[\s~'"<>]/.test(password),
		},
		{
			text: 'Not contain your email, user ID, full company name, first name or last name',
			met:
				!password.toLowerCase().includes(email.toLowerCase()) &&
				!password.toLowerCase().includes(firstName.toLowerCase()) &&
				!password.toLowerCase().includes(lastName.toLowerCase()),
		},
	];

	if (success) {
		return (
			<div className="max-w-4xl mx-auto p-6 bg-white">
				<div className="text-center">
					<div className="mb-4">
						<svg
							className="w-16 h-16 text-green-500 mx-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-normal text-gray-800 mb-4">
						Account Created Successfully!
					</h1>
					<p className="text-gray-600 mb-6">
						Your FedEx account has been created. You will be redirected to the
						login page shortly.
					</p>
					<Link
						href="/login"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Click here to log in now
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white">
			{/* Progress Steps */}
			<div className="max-w-4xl mx-auto mb-8">
				<div className="flex items-center justify-between">
					{/* Contact details - Active */}
					<div className="flex-1">
						<div className="h-1 bg-blue-600 rounded-full"></div>
						<div className="text-center mt-3 text-sm font-medium text-gray-800">
							Contact details
						</div>
					</div>

					{/* Account details - Inactive */}
					<div className="flex-1 mx-4">
						<div className="h-1 bg-gray-300 rounded-full"></div>
						<div className="text-center mt-3 text-sm font-medium text-gray-500">
							Account details
						</div>
					</div>

					{/* Complete - Inactive */}
					<div className="flex-1">
						<div className="h-1 bg-gray-300 rounded-full"></div>
						<div className="text-center mt-3 text-sm font-medium text-gray-500">
							Complete
						</div>
					</div>
				</div>
			</div>

			{/* Main Title */}
			<div className="text-center mb-8">
				<h1 className="text-3xl font-normal text-gray-800 mb-4">
					Create your FedEx account
				</h1>
				<p className="text-gray-600">
					Already have a user ID?{' '}
					<Link href="/login" className="text-blue-600 underline">
						Log in.
					</Link>
				</p>
			</div>

			{/* Error Message */}
			{error && (
				<div className="max-w-2xl mx-auto mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
					{error}
				</div>
			)}

			{/* Create User ID Section */}
			<div className="max-w-2xl mx-auto">
				<h2 className="text-2xl font-normal text-gray-800 mb-8 text-center">
					Create a user ID
				</h2>

				<div className="space-y-6">
					{/* Email Field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Email*
						</label>
						<div className="relative">
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>

					{/* Custom User ID Checkbox */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="customUserId"
							checked={showCustomUserId}
							onChange={(e) => setShowCustomUserId(e.target.checked)}
							className="w-4 h-4 text-blue-600 border-2 border-blue-600 focus:ring-blue-500"
						/>
						<label
							htmlFor="customUserId"
							className="ml-3 text-sm text-gray-700"
						>
							Create a custom user ID to log in
						</label>
					</div>

					{/* User ID Field (conditional) */}
					{showCustomUserId && (
						<div>
							<label
								htmlFor="userId"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								User ID*
							</label>
							<input
								type="text"
								id="userId"
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								placeholder="Your user ID can be a name you choose to log in."
								className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<div className="mt-1 text-xs text-gray-500 bg-yellow-50 px-3 py-2 border border-yellow-200">
								Your user ID can be a name you choose to log in.
							</div>
						</div>
					)}

					{/* Password Field */}
					<div className="relative">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password*
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => setShowPasswordRequirements(true)}
								onBlur={() => setShowPasswordRequirements(false)}
								required
								className="w-full px-3 py-3 pr-12 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
							/>
							<div className="absolute right-0 top-0 h-full w-12 border-l border-gray-300 flex items-center justify-center">
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="text-gray-500 hover:text-gray-700"
								>
									{showPassword ? (
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
											<line x1="1" y1="1" x2="23" y2="23" />
										</svg>
									) : (
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Password Requirements */}
						{showPasswordRequirements && (
							<div className="absolute top-full left-0 right-0 mt-1 bg-gray-100 border border-gray-300 p-4 z-10">
								<div className="text-sm font-medium text-gray-700 mb-2">
									Your password must:
								</div>
								<div className="space-y-1">
									{passwordRequirements.map((req, index) => (
										<div key={index} className="flex items-center text-xs">
											<svg
												className={`w-3 h-3 mr-2 ${
													req.met ? 'text-green-600' : 'text-gray-400'
												}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
											<span
												className={req.met ? 'text-green-700' : 'text-gray-600'}
											>
												{req.text}
											</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Continue Button */}
					{!showContactDetails && (
						<div className="text-center pt-4">
							<button
								onClick={handleContinueClick}
								disabled={!email || !password}
								className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 text-sm tracking-wide"
							>
								CREATE LOGIN
							</button>
						</div>
					)}
				</div>

				{/* Contact Details Section */}
				{showContactDetails && (
					<form
						onSubmit={handleSubmit}
						className="mt-12 pt-8 border-t border-gray-200"
					>
						<h2 className="text-2xl font-normal text-gray-800 mb-8 text-center">
							Enter your contact details
						</h2>

						<div className="space-y-6">
							{/* First Name and Last Name */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										First name*
									</label>
									<input
										type="text"
										id="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Last name*
									</label>
									<input
										type="text"
										id="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>

							{/* Country/Territory */}
							<div>
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Country/Territory*
								</label>
								<div className="relative">
									<select
										id="country"
										value={country}
										onChange={(e) => setCountry(e.target.value)}
										required
										className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
									>
										<option value="United States">United States</option>
										<option value="Canada">Canada</option>
										<option value="Mexico">Mexico</option>
									</select>
									<div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
										<svg
											className="w-5 h-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Contact Address */}
							<div>
								<label
									htmlFor="address"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Contact address*
								</label>
								<input
									type="text"
									id="address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									required
									className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Country Code and Phone */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<label
										htmlFor="countryCode"
										className="block text-sm font-medium text-gray-500 mb-2"
									>
										Country code*
									</label>
									<input
										type="text"
										id="countryCode"
										value={countryCode}
										onChange={(e) => setCountryCode(e.target.value)}
										required
										className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
								<div className="md:col-span-2">
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Phone*
									</label>
									<input
										type="tel"
										id="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
										className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>

							{/* Checkboxes */}
							<div className="space-y-4">
								<div className="flex items-start">
									<input
										type="checkbox"
										id="terms"
										checked={termsAccepted}
										onChange={(e) => setTermsAccepted(e.target.checked)}
										required
										className="w-4 h-4 text-blue-600 border-2 border-blue-600 focus:ring-blue-500 mt-1"
									/>
									<label htmlFor="terms" className="ml-3 text-sm text-gray-700">
										I have read, understood and agree to be bound by the{' '}
										<a href="#" className="text-blue-600 underline">
											fedex.com Terms of Use
										</a>
										. I also understand how FedEx intends to use my information
										according to the{' '}
										<a href="#" className="text-blue-600 underline">
											Security and Privacy Policy
										</a>
										.
									</label>
								</div>
								<div className="flex items-start">
									<input
										type="checkbox"
										id="marketing"
										checked={marketingUpdates}
										onChange={(e) => setMarketingUpdates(e.target.checked)}
										className="w-4 h-4 text-blue-600 border-2 border-blue-600 focus:ring-blue-500 mt-1"
									/>
									<label
										htmlFor="marketing"
										className="ml-3 text-sm text-gray-700"
									>
										Send me updates from FedEx with promotions and important
										information (you can unsubscribe at any time).
									</label>
								</div>
							</div>

							{/* Submit Button */}
							<div className="text-center pt-6">
								<button
									type="submit"
									disabled={loading}
									className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 text-sm tracking-wide"
								>
									{loading ? 'CREATING ACCOUNT...' : 'CONTINUE'}
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
