'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';

import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
	const [isShippingOpen, setShippingOpen] = useState(false);
	const [isTrackingOpen, setTrackingOpen] = useState(false);
	const [isLocationsOpen, setLocationsOpen] = useState(false);
	const [isDesignOpen, setDesignOpen] = useState(false);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isSupportOpen, setSupportOpen] = useState(false);
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isProfileOpen, setProfileOpen] = useState(false);

	const { data: session, status } = useSession();

	const shippingRef = useRef<HTMLDivElement>(null);
	const trackingRef = useRef<HTMLDivElement>(null);
	const locationsRef = useRef<HTMLDivElement>(null);
	const designRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const supportRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (mobileMenuRef.current && mobileMenuRef.current.contains(target)) {
				return;
			}
			if (shippingRef.current && !shippingRef.current.contains(target)) {
				setShippingOpen(false);
			}
			if (trackingRef.current && !trackingRef.current.contains(target)) {
				setTrackingOpen(false);
			}
			if (locationsRef.current && !locationsRef.current.contains(target)) {
				setLocationsOpen(false);
			}
			if (designRef.current && !designRef.current.contains(target)) {
				setDesignOpen(false);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
				setMobileMenuOpen(false);
			}
			if (supportRef.current && !supportRef.current.contains(target)) {
				setSupportOpen(false);
			}
			if (searchRef.current && !searchRef.current.contains(target)) {
				setSearchOpen(false);
			}
			if (profileRef.current && !profileRef.current.contains(target)) {
				setProfileOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	const toggleMobileDropdown = (dropdownName: string) => {
		switch (dropdownName) {
			case 'shipping':
				setShippingOpen(!isShippingOpen);
				setTrackingOpen(false);
				setLocationsOpen(false);
				setDesignOpen(false);
				setSupportOpen(false);
				setProfileOpen(false);
				break;
			case 'tracking':
				setTrackingOpen(!isTrackingOpen);
				setShippingOpen(false);
				setLocationsOpen(false);
				setDesignOpen(false);
				setSupportOpen(false);
				setProfileOpen(false);
				break;
			case 'design':
				setDesignOpen(!isDesignOpen);
				setShippingOpen(false);
				setTrackingOpen(false);
				setLocationsOpen(false);
				setSupportOpen(false);
				setProfileOpen(false);
				break;
			case 'support':
				setSupportOpen(!isSupportOpen);
				setShippingOpen(false);
				setTrackingOpen(false);
				setLocationsOpen(false);
				setDesignOpen(false);
				setProfileOpen(false);
				break;
			case 'locations':
				setLocationsOpen(!isLocationsOpen);
				setShippingOpen(false);
				setTrackingOpen(false);
				setDesignOpen(false);
				setSupportOpen(false);
				setProfileOpen(false);
				break;
			case 'profile':
				setProfileOpen(!isProfileOpen);
				setShippingOpen(false);
				setTrackingOpen(false);
				setLocationsOpen(false);
				setDesignOpen(false);
				setSupportOpen(false);
				break;
		}
	};

	return (
		<nav className="bg-[#4D148C] text-white shadow-md relative z-50">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-12 items-center">
					<div className="flex items-center">
						<Link href="/" className="hover:underline">
							<Image
								src="/images/logo.png"
								alt="FedEx Logo"
								width={90}
								height={40}
								className="object-contain"
							/>
						</Link>
					</div>

					<div
						className={`hidden md:flex items-center h-full transition-all duration-300 ${
							isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
						}`}
					>
						<div className="relative h-full" ref={shippingRef}>
							<button
								onClick={() => {
									setShippingOpen(!isShippingOpen);
									setTrackingOpen(false);
									setLocationsOpen(false);
									setDesignOpen(false);
									setSupportOpen(false);
									setProfileOpen(false);
								}}
								className={`flex items-center h-full text-sm font-medium px-3 hover:underline ${
									isShippingOpen ? 'bg-white text-[#4D148C]' : ''
								}`}
							>
								Shipping
								<svg
									className={`ml-1 h-4 w-4 transform transition-transform ${
										isShippingOpen ? 'rotate-0' : ''
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							{isShippingOpen && (
								<div className="absolute z-10 left-0 top-full w-72 bg-white text-gray-800 border border-gray-200 shadow-lg">
									{session ? (
										<Link
											href="/create-shipment"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Create A Shipment
										</Link>
									) : (
										<Link
											href="/login"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Create A Shipment (Sign In Required)
										</Link>
									)}
									<Link
										href="/shipping-rates"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Shipping Rates & Delivery Times
									</Link>
									{session ? (
										<Link
											href="/pickups"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Schedule & Manage Pickups
										</Link>
									) : (
										<Link
											href="/login"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Schedule & Manage Pickups (Sign In Required)
										</Link>
									)}
									<Link
										href="/supplies"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Packing & Shipping Supplies
									</Link>
									<Link
										href="/international"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										International Shipping Guide
									</Link>
									<Link
										href="/freight"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Freight Shipping
									</Link>
									{session ? (
										<Link
											href="/returns"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Manage A Return
										</Link>
									) : (
										<Link
											href="/login"
											className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
										>
											Manage A Return (Sign In Required)
										</Link>
									)}
									<Link
										href="/all-shipping"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm font-semibold text-[#4D148C]"
									>
										ALL SHIPPING SERVICES
									</Link>
								</div>
							)}
						</div>

						<div className="relative h-full" ref={trackingRef}>
							<button
								onClick={() => {
									setTrackingOpen(!isTrackingOpen);
									setShippingOpen(false);
									setLocationsOpen(false);
									setDesignOpen(false);
									setSupportOpen(false);
									setProfileOpen(false);
								}}
								className={`flex items-center h-full text-sm font-medium px-4 hover:underline ${
									isTrackingOpen ? 'bg-white text-[#4D148C]' : ''
								}`}
							>
								Tracking
								<svg
									className={`ml-1 h-4 w-4 transform transition-transform ${
										isTrackingOpen ? 'rotate-0' : ''
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							{isTrackingOpen && (
								<div className="absolute z-10 left-0 top-full w-64 bg-white text-gray-800 border border-gray-200 shadow-lg">
									<div className="px-1 py-2 border-b border-gray-200">
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const formData = new FormData(e.currentTarget);
												const trackingId = formData.get('trackingId') as string;
												if (trackingId.trim()) {
													window.location.href = `/fedextrack/${encodeURIComponent(
														trackingId.trim()
													)}`;
												}
											}}
											className="flex flex-col space-y-2 w-full"
										>
											<input
												name="trackingId"
												type="text"
												placeholder="Tracking ID"
												className="w-full outline-none text-sm border border-gray-300 px-2 py-1"
											/>
											<button
												type="submit"
												className="w-full bg-[#4D148C] text-white px-3 py-1 text-sm hover:bg-[#3D0F6B] transition-colors"
											>
												TRACK
											</button>
										</form>
									</div>
									{session ? (
										<>
											<Link
												href="/fedextrack"
												className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
											>
												Advanced Shipment Tracking
											</Link>
											<Link
												href="/fedextrack"
												className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
											>
												Manage Your Delivery
											</Link>
										</>
									) : (
										<>
											<Link
												href="/login"
												className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
											>
												Advanced Shipment Tracking (Sign In Required)
											</Link>
											<Link
												href="/login"
												className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
											>
												Manage Your Delivery (Sign In Required)
											</Link>
										</>
									)}
									<Link
										href="/all-tracking"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm font-semibold text-[#4D148C]"
									>
										ALL TRACKING SERVICES
									</Link>
								</div>
							)}
						</div>

						<div className="relative h-full" ref={designRef}>
							<button
								onClick={() => {
									setDesignOpen(!isDesignOpen);
									setShippingOpen(false);
									setTrackingOpen(false);
									setLocationsOpen(false);
									setSupportOpen(false);
									setProfileOpen(false);
								}}
								className={`flex items-center h-full text-sm font-medium px-4 hover:underline ${
									isDesignOpen ? 'bg-white text-[#4D148C]' : ''
								}`}
							>
								Design & print
								<svg
									className={`ml-1 h-4 w-4 transform transition-transform ${
										isDesignOpen ? 'rotate-0' : ''
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							{isDesignOpen && (
								<div className="absolute z-10 left-0 top-full w-64 bg-white text-gray-800 border border-gray-200 shadow-lg">
									<Link
										href="/explore-prints"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Explore Prints
									</Link>
									<Link
										href="/products"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Products
									</Link>
									<Link
										href="/design-services"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Design Services
									</Link>
									<Link
										href="/browse-services"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Browse Services
									</Link>
									<Link
										href="/marketplace"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm font-semibold text-[#4D148C]"
									>
										VISIT NEW MARKETPLACE
									</Link>
								</div>
							)}
						</div>

						<div className="relative h-full" ref={locationsRef}>
							<button
								onClick={() => {
									setLocationsOpen(!isLocationsOpen);
									setShippingOpen(false);
									setTrackingOpen(false);
									setDesignOpen(false);
									setSupportOpen(false);
									setProfileOpen(false);
								}}
								className={`flex items-center h-full text-sm font-medium px-4 hover:underline ${
									isLocationsOpen ? 'bg-white text-[#4D148C]' : ''
								}`}
							>
								Locations
								<svg
									className={`ml-1 h-4 w-4 transform transition-transform ${
										isLocationsOpen ? 'rotate-0' : ''
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							{isLocationsOpen && (
								<div className="absolute z-10 left-0 top-full w-64 bg-white text-gray-800 border border-gray-200 shadow-lg">
									<Link
										href="/drop-off"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Drop Off Package
									</Link>
									<Link
										href="/find-location"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm font-semibold text-[#4D148C]"
									>
										FIND A LOCATION
									</Link>
								</div>
							)}
						</div>

						<div className="relative h-full" ref={supportRef}>
							<button
								onClick={() => {
									setSupportOpen(!isSupportOpen);
									setShippingOpen(false);
									setTrackingOpen(false);
									setLocationsOpen(false);
									setDesignOpen(false);
									setProfileOpen(false);
								}}
								className={`flex items-center h-full text-sm font-medium px-4 hover:underline ${
									isSupportOpen ? 'bg-white text-[#4D148C]' : ''
								}`}
							>
								Support
								<svg
									className={`ml-1 h-4 w-4 transform transition-transform ${
										isSupportOpen ? 'rotate-0' : ''
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							{isSupportOpen && (
								<div className="absolute z-10 left-0 top-full w-64 bg-white text-gray-800 border border-gray-200 shadow-lg">
									<Link
										href="/small-business"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Small Business Center
									</Link>
									<Link
										href="/service-guide"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										FedEx Service Guide
									</Link>
									<Link
										href="/account-management"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Account Management Tools
									</Link>
									<Link
										href="/faq"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Frequently Asked Questions
									</Link>
									<Link
										href="/file-claim"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										File a Claim
									</Link>
									<Link
										href="/billing"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
									>
										Billing and Invoicing
									</Link>
									<Link
										href="/customer-support"
										className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm font-semibold text-[#4D148C]"
									>
										CUSTOMER SUPPORT
									</Link>
								</div>
							)}
						</div>
					</div>

					<div className="flex items-center space-x-3">
						{!isSearchOpen && (
							<div className="relative h-full" ref={profileRef}>
								<button
									onClick={() => {
										setProfileOpen(!isProfileOpen);
										setShippingOpen(false);
										setTrackingOpen(false);
										setLocationsOpen(false);
										setDesignOpen(false);
										setSupportOpen(false);
									}}
									className="flex items-center font-medium hover:underline"
								>
									<span className="hidden sm:inline text-sm mr-2">
										{status === 'loading'
											? 'Loading...'
											: session
											? `${session.user?.name || session.user?.email}`
											: 'Sign Up or Log In'}
									</span>
									<RxAvatar className="h-8 w-8 mr-2" />
								</button>
								{isProfileOpen && (
									<div className="absolute z-10 right-0 md:left-0 top-full w-80 bg-white text-gray-800 border border-gray-200 shadow-lg">
										{session ? (
											<>
												<div className="px-4 py-3 border-b border-gray-200">
													<p className="text-sm font-medium text-gray-900">
														{session.user?.name || 'User'}
													</p>
													<p className="text-xs text-gray-500">
														{session.user?.email}
													</p>
													{session.user?.role === 'admin' && (
														<span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
															Admin
														</span>
													)}
												</div>
												<div className="px-4 py-2 border-b border-gray-200">
													<p className="text-xs font-semibold text-gray-500">
														ACCOUNT FEATURES
													</p>
												</div>
												{session.user?.role === 'admin' && (
													<Link
														href="/admin"
														className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
													>
														Admin Dashboard
													</Link>
												)}
												<Link
													href="/profile"
													className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
												>
													My Profile
												</Link>
												<Link
													href="/email-preferences"
													className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
												>
													Email Preferences
												</Link>
												<Link
													href="/address-book"
													className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
												>
													Address Book
												</Link>
												<Link
													href="/billing"
													className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
												>
													View & Pay Bill
												</Link>
												<Link
													href="/reporting"
													className="block px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm border-b border-gray-100"
												>
													Reporting
												</Link>
												<button
													onClick={() => signOut({ callbackUrl: '/' })}
													className="block w-full text-left px-6 py-3 hover:bg-gray-50 hover:font-bold text-sm text-red-600"
												>
													Sign Out
												</button>
											</>
										) : (
											<>
												<div className="px-4 py-3 border-b border-gray-200">
													<div className="flex space-x-4">
														<Link
															href="/signup"
															className="flex-1 bg-[#4D148C] text-white text-center py-2 px-4 text-sm font-medium hover:bg-[#3D0F6B] transition-colors"
														>
															SIGN UP
														</Link>
														<Link
															href="/login"
															className="flex-1 border border-[#4D148C] text-[#4D148C] text-center py-2 px-4 text-sm font-medium hover:bg-[#4D148C] hover:text-white transition-colors"
														>
															LOG IN
														</Link>
													</div>
												</div>
												<div className="px-4 py-2 border-b border-gray-200">
													<p className="text-xs font-semibold text-gray-500">
														ACCOUNT FEATURES
													</p>
												</div>
												<div className="px-6 py-3 bg-gray-50 text-xs text-gray-600">
													Open an account to save on shipping costs, time-saving
													tools
												</div>
											</>
										)}
									</div>
								)}
							</div>
						)}

						<div className="hidden sm:flex items-center" ref={searchRef}>
							{!isSearchOpen ? (
								<button
									onClick={() => setSearchOpen(true)}
									className="text-white p-2"
								>
									<svg
										className="h-8 w-8"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</button>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const formData = new FormData(e.currentTarget);
										const searchQuery = formData.get('searchQuery') as string;
										if (searchQuery.trim()) {
											// Check if it looks like a tracking number (alphanumeric, 8-20 characters)
											const trackingPattern = /^[A-Z0-9]{8,20}$/i;
											if (trackingPattern.test(searchQuery.trim())) {
												window.location.href = `/fedextrack/${encodeURIComponent(
													searchQuery.trim()
												)}`;
											} else {
												// For now, just search for tracking. You can expand this later
												window.location.href = `/fedextrack/${encodeURIComponent(
													searchQuery.trim()
												)}`;
											}
										}
									}}
									className="flex items-center border border-white border-opacity-50 rounded-md overflow-hidden"
								>
									<input
										name="searchQuery"
										type="text"
										placeholder="Search for tracking number"
										className="px-4 py-2 text-white placeholder-white placeholder-opacity-70 outline-none w-64 bg-transparent"
										autoFocus
									/>
									<div className="w-px bg-white bg-opacity-30 h-6"></div>
									<button
										type="submit"
										className="px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors"
									>
										<svg
											className="h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											/>
										</svg>
									</button>
									<button
										onClick={() => setSearchOpen(false)}
										className="px-2 py-2 text-white"
									>
										<svg
											className="h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</form>
							)}
						</div>

						<button
							className="md:hidden text-white p-2 w-10 h-10 flex flex-col justify-center items-center"
							onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle mobile menu"
						>
							<div className="w-6 h-5 relative flex flex-col justify-between">
								<span
									className={`block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${
										isMobileMenuOpen
											? 'rotate-45 translate-y-2'
											: 'rotate-0 translate-y-0'
									}`}
								/>
								<span
									className={`block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${
										isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
									}`}
								/>
								<span
									className={`block h-0.5 w-full bg-white transform transition-all duration-300 ease-in-out ${
										isMobileMenuOpen
											? '-rotate-45 -translate-y-2'
											: 'rotate-0 translate-y-0'
									}`}
								/>
							</div>
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div
						className="md:hidden bg-white text-gray-800 fixed inset-0 overflow-y-auto z-50"
						ref={mobileMenuRef}
					>
						<div className="container mx-auto">
							<div className="flex justify-between px-4 py-4 items-center bg-[#4D148C] mb-4">
								<Image
									src="/images/logo.png"
									alt="FedEx Logo"
									width={80}
									height={40}
									className="object-contain"
								/>
								<div className="flex items-center justify-between">
									<RxAvatar className="text-white h-8 w-8 mr-2" />
									<button
										onClick={closeMobileMenu}
										className="text-white hover:text-gray-300 p-2"
									>
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div className="space-y-2 sm:w-1/2 sm:mx-auto">
								<div className="pt-2">
									<button
										onClick={() => toggleMobileDropdown('shipping')}
										className={`flex items-center justify-between w-full text-sm font-medium px-3 py-3 rounded ${
											isShippingOpen
												? 'bg-[#4D148C] text-white'
												: 'hover:bg-gray-100'
										}`}
									>
										<span>SHIPPING</span>
										<svg
											className={`ml-1 h-4 w-4 transform transition-transform ${
												isShippingOpen ? 'rotate-180' : ''
											}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									{isShippingOpen && (
										<div className="mt-2 pl-4 space-y-2 bg-gray-100 rounded">
											{session ? (
												<Link
													href="/create-shipment"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Create A Shipment
												</Link>
											) : (
												<Link
													href="/login"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Create A Shipment (Sign In Required)
												</Link>
											)}
											<Link
												href="/shipping-rates"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Shipping Rates & Delivery Times
											</Link>
											{session ? (
												<Link
													href="/pickups"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Schedule & Manage Pickups
												</Link>
											) : (
												<Link
													href="/login"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Schedule & Manage Pickups (Sign In Required)
												</Link>
											)}
											<Link
												href="/supplies"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Packing & Shipping Supplies
											</Link>
											<Link
												href="/international"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												International Shipping Guide
											</Link>
											<Link
												href="/freight"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Freight Shipping
											</Link>
											{session ? (
												<Link
													href="/returns"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Manage A Return
												</Link>
											) : (
												<Link
													href="/login"
													className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
													onClick={closeMobileMenu}
												>
													Manage A Return (Sign In Required)
												</Link>
											)}
											<Link
												href="/all-shipping"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold font-semibold"
												onClick={closeMobileMenu}
											>
												ALL SHIPPING SERVICES
											</Link>
										</div>
									)}
								</div>

								<div className="pt-2">
									<button
										onClick={() => toggleMobileDropdown('tracking')}
										className={`flex items-center justify-between w-full text-sm font-medium px-3 py-3 rounded ${
											isTrackingOpen
												? 'bg-[#4D148C] text-white'
												: 'hover:bg-gray-100'
										}`}
									>
										<span>TRACKING</span>
										<svg
											className={`ml-1 h-4 w-4 transform transition-transform ${
												isTrackingOpen ? 'rotate-180' : ''
											}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									{isTrackingOpen && (
										<div className="mt-2 pl-4 space-y-2 bg-gray-100 rounded">
											<form
												onSubmit={(e) => {
													e.preventDefault();
													const formData = new FormData(e.currentTarget);
													const trackingId = formData.get(
														'mobileTrackingId'
													) as string;
													if (trackingId.trim()) {
														window.location.href = `/fedextrack/${encodeURIComponent(
															trackingId.trim()
														)}`;
														closeMobileMenu();
													}
												}}
												className="flex flex-col space-y-2 pb-2 border-b border-gray-300 px-1"
											>
												<input
													name="mobileTrackingId"
													type="text"
													placeholder="Tracking ID"
													className="w-full outline-none text-lg bg-white text-gray-800 border border-gray-300 px-2 py-1"
												/>
												<button
													type="submit"
													className="w-full bg-orange-500 text-white font-bold text-lg px-3 py-1 hover:bg-orange-600 transition-colors"
												>
													TRACK
												</button>
											</form>
											{session ? (
												<>
													<Link
														href="/fedextrack"
														className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
														onClick={closeMobileMenu}
													>
														Advanced Tracking
													</Link>
													<Link
														href="/fedextrack"
														className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
														onClick={closeMobileMenu}
													>
														Manage Delivery
													</Link>
												</>
											) : (
												<>
													<Link
														href="/login"
														className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
														onClick={closeMobileMenu}
													>
														Advanced Tracking (Sign In Required)
													</Link>
													<Link
														href="/login"
														className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
														onClick={closeMobileMenu}
													>
														Manage Delivery (Sign In Required)
													</Link>
												</>
											)}
											<Link
												href="/all-tracking"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold font-semibold"
												onClick={closeMobileMenu}
											>
												ALL TRACKING SERVICES
											</Link>
										</div>
									)}
								</div>

								<div className="pt-2">
									<button
										onClick={() => toggleMobileDropdown('design')}
										className={`flex items-center justify-between w-full text-sm font-medium px-3 py-3 rounded ${
											isDesignOpen
												? 'bg-[#4D148C] text-white'
												: 'hover:bg-gray-100'
										}`}
									>
										<span>DESIGN & PRINT</span>
										<svg
											className={`ml-1 h-4 w-4 transform transition-transform ${
												isDesignOpen ? 'rotate-180' : ''
											}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									{isDesignOpen && (
										<div className="mt-2 pl-4 space-y-2 bg-gray-100 rounded">
											<Link
												href="/explore-prints"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Explore Prints
											</Link>
											<Link
												href="/products"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Products
											</Link>
											<Link
												href="/design-services"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Design Services
											</Link>
											<Link
												href="/browse-services"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Browse Services
											</Link>
											<Link
												href="/marketplace"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold font-semibold"
												onClick={closeMobileMenu}
											>
												Visit New Marketplace
											</Link>
										</div>
									)}
								</div>

								<div className="pt-2">
									<button
										onClick={() => toggleMobileDropdown('support')}
										className={`flex items-center justify-between w-full text-sm font-medium px-3 py-3 rounded ${
											isSupportOpen
												? 'bg-[#4D148C] text-white'
												: 'hover:bg-gray-100'
										}`}
									>
										<span>SUPPORT</span>
										<svg
											className={`ml-1 h-4 w-4 transform transition-transform ${
												isSupportOpen ? 'rotate-180' : ''
											}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									{isSupportOpen && (
										<div className="mt-2 pl-4 space-y-2 bg-gray-100 rounded">
											<Link
												href="/small-business"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Small Business Center
											</Link>
											<Link
												href="/service-guide"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												FedEx Service Guide
											</Link>
											<Link
												href="/account-management"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Account Management Tools
											</Link>
											<Link
												href="/faq"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Frequently Asked Questions
											</Link>
											<Link
												href="/file-claim"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												File a Claim
											</Link>
											<Link
												href="/billing"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Billing and Invoicing
											</Link>
											<Link
												href="/customer-support"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold"
												onClick={closeMobileMenu}
											>
												Customer Support
											</Link>
										</div>
									)}
								</div>

								<div className="pt-2">
									<button
										onClick={() => toggleMobileDropdown('locations')}
										className={`flex items-center justify-between w-full text-sm font-medium px-3 py-3 rounded ${
											isLocationsOpen
												? 'bg-[#4D148C] text-white'
												: 'hover:bg-gray-100'
										}`}
									>
										<span>LOCATIONS</span>
										<svg
											className={`ml-1 h-4 w-4 transform transition-transform ${
												isLocationsOpen ? 'rotate-180' : ''
											}`}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									{isLocationsOpen && (
										<div className="mt-2 pl-4 space-y-2 bg-gray-100 rounded">
											<Link
												href="/drop-off"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold border-b border-gray-300"
												onClick={closeMobileMenu}
											>
												Drop Off Package
											</Link>
											<Link
												href="/find-location"
												className="block text-sm py-3 px-4 hover:bg-gray-200 hover:font-bold"
												onClick={closeMobileMenu}
											>
												Find A Location
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
