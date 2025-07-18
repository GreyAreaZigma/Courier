'use client';
import React, { useState, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Shipment {
	id: string;
	trackingId: string;
	status: string;
	fromLocation: string;
	toLocation: string;
	estimatedDelivery: string | null;
	deliveryStartTime: string | null;
	deliveryEndTime: string | null;
	signatureRequired: boolean;
	serviceType: string;
	terms: string;
	weight: string | null;
	dimensions: string | null;
	totalPieces: number;
	packaging: string;
	events: TrackingEvent[];
}

interface TrackingEvent {
	id: string;
	eventType: string;
	location: string;
	description: string;
	timestamp: string;
	status: string;
	order: number;
}

const TrackingDetailPage = () => {
	const [showTimeDropdown, setShowTimeDropdown] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [shipment, setShipment] = useState<Shipment | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const trackingId = params.id as string;

	useEffect(() => {
		const fetchShipment = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/track/${trackingId}`);
				if (response.ok) {
					const data = await response.json();
					setShipment(data);
				} else {
					setError('Shipment not found');
				}
			} catch (error) {
				console.error('Error fetching shipment:', error);
				setError('Failed to load shipment data');
			} finally {
				setLoading(false);
			}
		};

		if (trackingId) {
			fetchShipment();
		}
	}, [trackingId]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'numeric',
			day: 'numeric',
			year: '2-digit',
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
	};

	const getStatusDisplay = (status: string) => {
		switch (status) {
			case 'out_for_delivery':
				return 'OUT FOR DELIVERY';
			case 'in_transit':
				return 'On the way';
			case 'delivered':
				return 'Delivered';
			case 'pending':
				return 'Pending';
			default:
				return status;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'out_for_delivery':
				return 'bg-green-500';
			case 'in_transit':
				return 'bg-purple-600';
			case 'delivered':
				return 'bg-green-500';
			default:
				return 'bg-purple-600';
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-xl">Loading shipment details...</div>
			</div>
		);
	}

	if (error || !shipment) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="text-xl text-red-600 mb-4">Shipment Not Found</div>
					<div className="text-gray-600">
						The tracking number {trackingId} could not be found.
					</div>
					<Link
						href="/fedextrack"
						className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-medium underline"
					>
						Track Another Shipment
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-300">
				<div className="flex flex-col md:flex-row justify-between items-center">
					{/* Left side - FedEx logo and mobile menu */}
					<div className="w-full md:w-auto mb-4 md:mb-0 flex items-center justify-between">
						<Link
							href="/fedextrack"
							className="text-2xl font-bold text-purple-800"
						>
							FedEx<sup>®</sup> Tracking
						</Link>
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
							<Link
								href="/fedextrack"
								className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
							>
								Track Another Shipment
							</Link>

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
							<Link
								href="/fedextrack"
								className="block text-purple-600 hover:text-purple-800 font-medium hover:underline py-2"
							>
								Track Another Shipment
							</Link>

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
				<div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
					<div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
						{/* Left Column - Delivery Info and Actions */}
						<div className="order-1 lg:order-1 space-y-8">
							{/* Delivery Information */}
							<div className="p-6 bg-white border border-gray-200 rounded-lg">
								<div className="space-y-4">
									<div>
										<p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-1">
											DELIVERY DATE
										</p>
										<h2 className="text-3xl font-light text-gray-900 mb-2">
											{shipment.estimatedDelivery
												? new Date(
														shipment.estimatedDelivery
												  ).toLocaleDateString('en-US', {
														weekday: 'long',
												  })
												: 'TBD'}
										</h2>
										<p className="text-gray-600 mb-1">Estimated between</p>
										<p className="text-xl font-medium text-gray-900">
											{shipment.deliveryStartTime && shipment.deliveryEndTime
												? `${shipment.deliveryStartTime} - ${shipment.deliveryEndTime}`
												: 'TBD'}
										</p>
									</div>

									<p className="text-sm text-gray-600">
										{shipment.signatureRequired
											? 'Signature required for delivery'
											: 'No signature needed for delivery'}
									</p>
								</div>
							</div>

							{/* Timeline - Mobile Only */}
							<div className="lg:hidden">
								{/* Timeline */}
								<div className="relative">
									{/* Vertical Line */}
									<div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>

									{/* Timeline Items */}
									<div className="space-y-8">
										{/* From */}
										<div className="relative">
											{/* Completed line segment */}
											<div className="absolute left-6 top-6 w-0.5 h-8 bg-purple-600"></div>

											<div className="flex items-start">
												{/* Dot */}
												<div className="relative z-10 flex-shrink-0">
													<div className="w-3 h-3 bg-purple-600 rounded-full"></div>
												</div>

												{/* Content */}
												<div className="flex-1 min-w-0 ml-6">
													<div className="space-y-1">
														<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
															FROM
														</h3>
														<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
															{shipment.fromLocation}
														</p>
														<p className="text-sm text-purple-600">
															{shipment.events.find(
																(e) => e.eventType === 'label_created'
															)
																? `${formatDate(
																		shipment.events.find(
																			(e) => e.eventType === 'label_created'
																		)!.timestamp
																  )} ${formatTime(
																		shipment.events.find(
																			(e) => e.eventType === 'label_created'
																		)!.timestamp
																  )}`
																: 'N/A'}
														</p>
													</div>
												</div>
											</div>
										</div>

										{/* Render tracking events */}
										{shipment.events
											.filter((event) => event.eventType !== 'label_created')
											.map((event, index) => {
												const isLast =
													index ===
													shipment.events.filter(
														(e) => e.eventType !== 'label_created'
													).length -
														1;
												const nextEvent = shipment.events.filter(
													(e) => e.eventType !== 'label_created'
												)[index + 1];

												return (
													<div key={event.id} className="relative">
														{/* Completed line segment */}
														{!isLast && nextEvent && (
															<div className="absolute left-6 top-6 w-0.5 h-8 bg-purple-600"></div>
														)}

														<div className="flex items-start">
															{/* Dot */}
															<div className="relative z-10 flex-shrink-0">
																<div
																	className={`w-3 h-3 ${getStatusColor(
																		event.status
																	)} rounded-full`}
																></div>
															</div>

															{/* Content */}
															<div className="flex-1 min-w-0 ml-6">
																<div className="space-y-1">
																	<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
																		{event.description}
																	</h3>
																	<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
																		{event.location}
																	</p>
																	<p className="text-sm text-purple-600">
																		{`${formatDate(
																			event.timestamp
																		)} ${formatTime(event.timestamp)}`}
																	</p>
																</div>
															</div>
														</div>
													</div>
												);
											})}

										{/* Current Status */}
										{shipment.status === 'out_for_delivery' && (
											<div className="relative">
												<div className="flex items-start">
													{/* Dot */}
													<div className="relative z-10 flex-shrink-0">
														<div className="w-3 h-3 bg-green-500 rounded-full"></div>
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0 ml-6">
														<div className="space-y-1">
															<h3 className="text-sm font-bold uppercase tracking-wider text-green-600">
																OUT FOR DELIVERY
															</h3>
														</div>
													</div>
												</div>
											</div>
										)}

										{/* To */}
										<div className="relative">
											<div className="flex items-start">
												{/* Dot */}
												<div className="relative z-10 flex-shrink-0">
													<div className="w-3 h-3 bg-purple-600 rounded-full"></div>
												</div>

												{/* Content */}
												<div className="flex-1 min-w-0 ml-6">
													<div className="space-y-1">
														<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
															TO
														</h3>
														<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
															{shipment.toLocation}
														</p>
														<p className="text-sm text-purple-600">
															{shipment.estimatedDelivery
																? new Date(
																		shipment.estimatedDelivery
																  ).toLocaleDateString('en-US', {
																		weekday: 'long',
																  })
																: 'TBD'}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Expandable Sections */}
							<div className="space-y-1">
								<button className="w-full flex justify-between items-center p-4 h-auto bg-white border border-gray-200 hover:bg-gray-50 rounded-lg">
									<div className="flex items-center space-x-3">
										{/* Settings Icon */}
										<svg
											className="h-5 w-5 text-gray-600"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											viewBox="0 0 24 24"
										>
											<path d="M12 4.5v15m7.5-7.5h-15" />
										</svg>
										<span className="text-gray-700 font-medium">
											Manage your delivery
										</span>
									</div>
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								<button className="w-full flex justify-between items-center p-4 h-auto bg-white border border-gray-200 hover:bg-gray-50 rounded-lg">
									<div className="flex items-center space-x-3">
										{/* Bell Icon */}
										<svg
											className="h-5 w-5 text-gray-600"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 01-6 0h6z"
											/>
										</svg>
										<span className="text-gray-700 font-medium">
											Get updates
										</span>
									</div>
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Right Column - Timeline (Desktop Only) */}
						<div className="order-2 lg:order-2 hidden lg:block">
							{/* Timeline */}
							<div className="relative">
								{/* Vertical Line */}
								<div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>

								{/* Timeline Items */}
								<div className="space-y-8">
									{/* From */}
									<div className="relative">
										{/* Completed line segment */}
										<div className="absolute left-6 top-6 w-0.5 h-8 bg-purple-600"></div>

										<div className="flex items-start">
											{/* Dot */}
											<div className="relative z-10 flex-shrink-0">
												<div className="w-3 h-3 bg-purple-600 rounded-full"></div>
											</div>

											{/* Content */}
											<div className="flex-1 min-w-0 ml-6">
												<div className="space-y-1">
													<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
														FROM
													</h3>
													<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
														{shipment.fromLocation}
													</p>
													<p className="text-sm text-purple-600">
														{shipment.events.find(
															(e) => e.eventType === 'label_created'
														)
															? `${formatDate(
																	shipment.events.find(
																		(e) => e.eventType === 'label_created'
																	)!.timestamp
															  )} ${formatTime(
																	shipment.events.find(
																		(e) => e.eventType === 'label_created'
																	)!.timestamp
															  )}`
															: 'N/A'}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Render tracking events */}
									{shipment.events
										.filter((event) => event.eventType !== 'label_created')
										.map((event, index) => {
											const isLast =
												index ===
												shipment.events.filter(
													(e) => e.eventType !== 'label_created'
												).length -
													1;
											const nextEvent = shipment.events.filter(
												(e) => e.eventType !== 'label_created'
											)[index + 1];

											return (
												<div key={event.id} className="relative">
													{/* Completed line segment */}
													{!isLast && nextEvent && (
														<div className="absolute left-6 top-6 w-0.5 h-8 bg-purple-600"></div>
													)}

													<div className="flex items-start">
														{/* Dot */}
														<div className="relative z-10 flex-shrink-0">
															<div
																className={`w-3 h-3 ${getStatusColor(
																	event.status
																)} rounded-full`}
															></div>
														</div>

														{/* Content */}
														<div className="flex-1 min-w-0 ml-6">
															<div className="space-y-1">
																<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
																	{event.description}
																</h3>
																<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
																	{event.location}
																</p>
																<p className="text-sm text-purple-600">
																	{`${formatDate(event.timestamp)} ${formatTime(
																		event.timestamp
																	)}`}
																</p>
															</div>
														</div>
													</div>
												</div>
											);
										})}

									{/* Current Status */}
									{shipment.status === 'out_for_delivery' && (
										<div className="relative">
											<div className="flex items-start">
												{/* Dot */}
												<div className="relative z-10 flex-shrink-0">
													<div className="w-3 h-3 bg-green-500 rounded-full"></div>
												</div>

												{/* Content */}
												<div className="flex-1 min-w-0 ml-6">
													<div className="space-y-1">
														<h3 className="text-sm font-bold uppercase tracking-wider text-green-600">
															OUT FOR DELIVERY
														</h3>
													</div>
												</div>
											</div>
										</div>
									)}

									{/* To */}
									<div className="relative">
										<div className="flex items-start">
											{/* Dot */}
											<div className="relative z-10 flex-shrink-0">
												<div className="w-3 h-3 bg-purple-600 rounded-full"></div>
											</div>

											{/* Content */}
											<div className="flex-1 min-w-0 ml-6">
												<div className="space-y-1">
													<h3 className="text-sm font-bold uppercase tracking-wider text-purple-800">
														TO
													</h3>
													<p className="text-sm font-medium uppercase tracking-wide text-purple-800">
														{shipment.toLocation}
													</p>
													<p className="text-sm text-purple-600">
														{shipment.estimatedDelivery
															? new Date(
																	shipment.estimatedDelivery
															  ).toLocaleDateString('en-US', {
																	weekday: 'long',
															  })
															: 'TBD'}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Shipment Facts Section */}
					<div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
						<h3 className="text-lg font-bold text-gray-900 mb-6">
							Shipment Facts
						</h3>

						{/* Shipment Overview */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
							<div>
								<h4 className="text-md font-semibold text-gray-800 mb-4">
									Shipment Overview
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Tracking number</span>
										<span className="font-mono font-medium">
											{shipment.trackingId}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Ship date</span>
										<span className="font-medium">
											{shipment.events.find(
												(e) => e.eventType === 'label_created'
											)
												? formatDate(
														shipment.events.find(
															(e) => e.eventType === 'label_created'
														)!.timestamp
												  )
												: 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Standard transit</span>
										<span className="font-medium">
											{shipment.estimatedDelivery
												? formatDate(shipment.estimatedDelivery)
												: 'TBD'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Status</span>
										<span
											className={`font-medium ${
												shipment.status === 'delivered'
													? 'text-green-600'
													: 'text-purple-600'
											}`}
										>
											{getStatusDisplay(shipment.status).toUpperCase()}
										</span>
									</div>
									{shipment.status === 'delivered' && (
										<div className="flex justify-between">
											<span className="text-gray-600">Delivered</span>
											<span className="font-medium">
												{shipment.events.find(
													(e) => e.eventType === 'delivered'
												)
													? `${formatDate(
															shipment.events.find(
																(e) => e.eventType === 'delivered'
															)!.timestamp
													  )} at ${formatTime(
															shipment.events.find(
																(e) => e.eventType === 'delivered'
															)!.timestamp
													  )}`
													: 'N/A'}
											</span>
										</div>
									)}
								</div>
							</div>

							<div>
								<h4 className="text-md font-semibold text-gray-800 mb-4">
									Services
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Service</span>
										<span className="font-medium">
											{shipment.serviceType || 'FedEx Ground'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Terms</span>
										<span className="font-medium">
											{shipment.terms || 'Third Party'}
										</span>
									</div>
								</div>

								<h4 className="text-md font-semibold text-gray-800 mb-4 mt-6">
									Package Details
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Weight</span>
										<span className="font-medium">
											{shipment.weight || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Dimensions</span>
										<span className="font-medium">
											{shipment.dimensions || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Total pieces</span>
										<span className="font-medium">
											{shipment.totalPieces || 1}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Packaging</span>
										<span className="font-medium">
											{shipment.packaging || 'Package'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Travel History Section */}
					<div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-lg font-bold text-gray-900">
								Travel History
							</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">
										SORT BY DATE/TIME
									</span>
									<button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
										Ascending
									</button>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">Time zone</span>
									<button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
										Local Scan Time
									</button>
								</div>
							</div>
						</div>

						{/* Travel History Timeline */}
						<div className="space-y-6">
							{/* Group events by date */}
							{(() => {
								const groupedEvents = shipment.events.reduce(
									(groups, event) => {
										const date = formatDate(event.timestamp);
										if (!groups[date]) {
											groups[date] = [];
										}
										groups[date].push(event);
										return groups;
									},
									{} as Record<string, typeof shipment.events>
								);

								// Sort dates and events
								const sortedDates = Object.keys(groupedEvents).sort(
									(a, b) => new Date(a).getTime() - new Date(b).getTime()
								);

								return sortedDates.map((date) => (
									<div
										key={date}
										className="border-b border-gray-200 pb-4 last:border-b-0"
									>
										<h4 className="text-sm font-semibold text-gray-800 mb-3">
											{new Date(date).toLocaleDateString('en-US', {
												weekday: 'long',
												month: 'numeric',
												day: 'numeric',
												year: 'numeric',
											})}
										</h4>
										<div className="space-y-3">
											{groupedEvents[date]
												.sort(
													(a, b) =>
														new Date(a.timestamp).getTime() -
														new Date(b.timestamp).getTime()
												)
												.map((event) => (
													<div
														key={event.id}
														className="flex items-start gap-4"
													>
														<div className="w-16 text-sm text-gray-500 font-mono">
															{formatTime(event.timestamp)}
														</div>
														<div className="flex-1">
															<p className="font-medium text-gray-900">
																{event.description}
															</p>
															<p className="text-sm text-gray-600">
																{event.location}
															</p>
														</div>
													</div>
												))}
										</div>
									</div>
								));
							})()}
						</div>

						<div className="mt-6 pt-4 border-t border-gray-200">
							<button className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
								Back to top
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackingDetailPage;
