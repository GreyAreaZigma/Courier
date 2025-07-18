'use client';
import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FedExTrackingPage = () => {
	const [showTimeDropdown, setShowTimeDropdown] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [trackingNumber, setTrackingNumber] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleTrackShipment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!trackingNumber.trim()) return;

		setIsLoading(true);
		try {
			// Redirect to the detailed tracking page
			router.push(`/fedextrack/${trackingNumber.trim()}`);
		} catch (error) {
			console.error('Error tracking shipment:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-300">
				<div className="flex flex-col md:flex-row justify-between items-center">
					{/* Left side - FedEx logo and mobile menu */}
					<div className="w-full md:w-auto mb-4 md:mb-0 flex items-center justify-between">
						<span className="text-2xl font-bold text-purple-800">
							FedEx<sup>®</sup> Tracking
						</span>
						<button
							className="md:hidden text-gray-700"
							onClick={() => setShowMobileMenu(!showMobileMenu)}
						>
							<CiMenuKebab size={24} />
						</button>
					</div>

					{/* Right side - Desktop Tracking options */}
					<div className="hidden md:block">
						<div className="flex gap-6 items-center">
							<div className="relative">
								<button
									className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
									onClick={() => setShowTimeDropdown(!showTimeDropdown)}
								>
									Local Scan Time
									<IoIosArrowDown
										size={16}
										className={`transition-transform ${
											showTimeDropdown ? 'rotate-180' : ''
										}`}
									/>
								</button>
								{showTimeDropdown && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Current Time
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Delivery Time
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Scan History
										</a>
									</div>
								)}
							</div>

							<Link
								href="/help"
								className="text-purple-600 hover:text-purple-800 font-medium underline"
							>
								Help
							</Link>
						</div>
					</div>

					{/* Mobile menu */}
					{showMobileMenu && (
						<div className="md:hidden w-full mt-4 space-y-3">
							<div className="relative">
								<button
									className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 py-2"
									onClick={() => setShowTimeDropdown(!showTimeDropdown)}
								>
									Local Scan Time
									<IoIosArrowDown
										size={16}
										className={`transition-transform ${
											showTimeDropdown ? 'rotate-180' : ''
										}`}
									/>
								</button>
								{showTimeDropdown && (
									<div className="ml-4 mt-1 space-y-2">
										<a
											href="#"
											className="block py-1 text-sm text-gray-700 hover:bg-gray-100"
										>
											Current Time
										</a>
										<a
											href="#"
											className="block py-1 text-sm text-gray-700 hover:bg-gray-100"
										>
											Delivery Time
										</a>
										<a
											href="#"
											className="block py-1 text-sm text-gray-700 hover:bg-gray-100"
										>
											Scan History
										</a>
									</div>
								)}
							</div>

							<Link
								href="/help"
								className="block text-purple-600 hover:text-purple-800 font-medium hover:underline py-2"
							>
								Help
							</Link>
						</div>
					)}
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					{/* Hero Section */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
							Track Your Package
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Enter your tracking number to get real-time updates on your FedEx
							shipment
						</p>
					</div>

					{/* Tracking Form */}
					<div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
						<form onSubmit={handleTrackShipment} className="space-y-6">
							<div>
								<label
									htmlFor="trackingNumber"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Tracking Number
								</label>
								<input
									type="text"
									id="trackingNumber"
									value={trackingNumber}
									onChange={(e) => setTrackingNumber(e.target.value)}
									placeholder="Enter your tracking number (e.g., 882643599240)"
									className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
									required
								/>
							</div>

							<button
								type="submit"
								disabled={isLoading || !trackingNumber.trim()}
								className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium transition-colors"
							>
								{isLoading ? 'Tracking...' : 'Track Package'}
							</button>
						</form>

						{/* Quick Track Examples */}
						<div className="mt-8 pt-6 border-t border-gray-200">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Quick Track Examples
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<button
									onClick={() => {
										setTrackingNumber('882643599240');
										router.push('/fedextrack/882643599240');
									}}
									className="text-left p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
								>
									<div className="font-mono text-sm text-purple-600 mb-1">
										882643599240
									</div>
									<div className="text-sm text-gray-600">
										Sample tracking number
									</div>
								</button>
								<button
									onClick={() => {
										setTrackingNumber('123456789012');
										router.push('/fedextrack/123456789012');
									}}
									className="text-left p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
								>
									<div className="font-mono text-sm text-purple-600 mb-1">
										123456789012
									</div>
									<div className="text-sm text-gray-600">Another example</div>
								</button>
							</div>
						</div>
					</div>

					{/* Additional Information */}
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Real-time Updates
							</h3>
							<p className="text-gray-600">
								Get instant updates on your package location and delivery status
							</p>
						</div>

						<div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Delivery Estimates
							</h3>
							<p className="text-gray-600">
								Know exactly when your package will arrive with accurate
								delivery estimates
							</p>
						</div>

						<div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-6 h-6 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Secure Tracking
							</h3>
							<p className="text-gray-600">
								Your tracking information is secure and only accessible to you
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FedExTrackingPage;
