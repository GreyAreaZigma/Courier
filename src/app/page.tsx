'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/Hero';
import TabContent from '@/components/TabContent';

const features = [
	{
		title: 'DROP OFF A PACKAGE',
		image: '/images/drop.png',
		alt: 'Drop off package icon',
		href: '/drop-off',
	},
	{
		title: 'REDIRECT A PACKAGE',
		image: '/images/bus.png',
		alt: 'Redirect package icon',
		href: '/redirect',
	},
	{
		title: 'STORE HOURS AND SERVICES',
		image: '/images/retail-services.svg',
		alt: 'Store hours and services icon',
		href: '/store-hours',
	},
	{
		title: 'SERVICE ALERTS',
		image: '/images/alert.png',
		alt: 'Service alerts icon',
		href: '/alerts',
	},
	{
		title: 'RETURN A PACKAGE',
		image: '/images/return.png',
		alt: 'Return package icon',
		href: '/return',
	},
];

export default function HomePage() {
	const [activeTab, setActiveTab] = useState('track');

	return (
		<div className="flex flex-col">
			{/* Hero Section with tabs */}
			<div className="relative">
				<HeroSection activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>

			{/* Show rate content below hero */}
			{activeTab === 'rate' && (
				<div className="w-full">
					<TabContent activeTab={activeTab} />
				</div>
			)}

			{/* Feature Section */}
			<div className="w-full flex justify-center py-10">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl w-full px-4">
					{features.map((feature, index) => (
						<Link
							href={feature.href}
							key={index}
							className="flex flex-col items-center gap-3 text-[#0d81ba] hover:underline"
						>
							<img
								src={feature.image}
								alt={feature.alt}
								className="w-20 h-20 md:w-24 md:h-24 object-contain"
							/>
							<span className="text-sm font-bold text-center">
								{feature.title}
							</span>
						</Link>
					))}
				</div>
			</div>
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 bg-[#fafafa]">
				{/* Image on left */}
				<div className="w-full md:w-2/5">
					<img
						src="/images/man.jpg"
						alt="Frederick W. Smith, Founder of FedEx"
						className="w-full h-auto"
					/>
					<p className="text-xs text-gray-500 italic mt-1">
						(Annie Leibovitz, 2023)
					</p>
				</div>

				{/* Text on right */}
				<div className="w-full md:w-3/5">
					<h2 className="text-xl md:text-2xl text-gray-900 mb-3">
						Honoring the Legacy of Frederick W. Smith, Visionary Founder of
						FedEx
					</h2>
					<p className="text-base text-gray-700 mb-4">
						An innovative leader whose legacy will be felt for generations to
						come.
					</p>
					<a
						href="/frederick-smith-legacy"
						className="text-purple-600 hover:text-purple-800 font-medium text-sm inline-flex items-center"
					>
						Read about Mr. Smith's legacy
					</a>
				</div>
			</div>
			<div className="max-w-4xl mx-auto px-4 py-12">
				<div className="flex flex-col lg:flex-row gap-12 items-start">
					{/* Image on top for small screens, right side for large */}
					<div className="w-full lg:w-1/2 order-1 lg:order-2">
						<img
							src="/images/girl.jpg"
							alt="FedEx shipping services"
							className="w-full h-auto rounded-lg shadow-lg object-cover"
						/>
					</div>

					{/* Text content - below image on small, left side on large */}
					<div className="w-full lg:w-1/2 order-2 lg:order-1">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
							Why ship with FedEx?
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Column 1 */}
							<div className="space-y-6">
								<div>
									<p className="text-lg font-medium text-gray-800 mb-2">
										Innovative solutions for reliability & speed
									</p>
									<p className="text-gray-700">
										Whether it's across states or worldwide, we prioritize the
										secure and swift arrival of your shipments.
									</p>
								</div>

								<div>
									<p className="text-lg font-medium text-gray-800 mb-2">
										We ship everywhere*
									</p>
									<p className="text-gray-700">
										From major cities to remote locations, your goods can reach
										worldwide.
									</p>
								</div>
							</div>

							{/* Column 2 */}
							<div className="space-y-6">
								<div>
									<p className="text-lg font-medium text-gray-800 mb-2">
										Premium shipping at professional rates
									</p>
									<p className="text-gray-700">
										When you need reliable delivery and careful handling, trust
										FedEx to get your items where they need to go on time.
									</p>
								</div>

								<div>
									<p className="text-lg font-medium text-gray-800 mb-2">
										FedEx can ship for less than the Post Office
									</p>
									<p className="text-gray-700">
										Two-day retail shipping, one flat rate. FedEx One Rate®**
									</p>
								</div>
							</div>
						</div>

						<div className="text-xs text-gray-500 space-y-1 mt-6">
							<p>*FedEx doesn't ship anywhere sanctioned by the U.S.</p>
							<p>**Exclusions apply. Visit the One Rate page to learn more.</p>
						</div>
					</div>
				</div>

				<div className="mt-8 flex justify-center">
					<button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
						Start shipping now
					</button>
				</div>
			</div>
			<div className="max-w-6xl mx-auto px-4 py-16">
				<div className="text-center">
					<h2 className="text-[34px] md:text-4xl font-light text-gray-900 mb-2">
						Get shipping options that work with your summer plans
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3">
					{/* Feature 1 - Mobile App */}
					<div className=" p-6 flex flex-col">
						<div className="mb-4 overflow-hidden">
							<img
								src="/images/one.jpg"
								alt="FedEx Mobile App"
								className="w-full h-48 object-cover"
							/>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							Use your phone as a shipping hub
						</h3>
						<p className="text-gray-700 mb-4 flex-grow">
							Download the free FedEx® Mobile app to track and manage packages
							on the go. Enable push notifications to get delivery status
							updates every step of the way.
						</p>
						<button className="mt-auto text-black text-left font-medium py-2 hover:underline w-full">
							DOWNLOAD THE APP
						</button>
					</div>

					{/* Feature 2 - Delivery Hold */}
					<div className="p-6 flex flex-col">
						<div className="mb-4 overflow-hidden">
							<img
								src="/images/two.jpg"
								alt="FedEx delivery hold"
								className="w-full h-48 object-cover"
							/>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							Let us store your delivery indoors
						</h3>
						<p className="text-gray-700 mb-4 flex-grow">
							If you're not going to be home for a delivery, request to hold it
							at a FedEx location for pickup. Or place a free vacation hold for
							up to 14 days.
						</p>
						<button className="mt-auto text-black text-left hover:underline font-medium py-2 w-full">
							REQUEST A HOLD
						</button>
					</div>

					{/* Feature 3 - Luggage Shipping */}
					<div className="p-6 flex flex-col">
						<div className="mb-4 overflow-hidden">
							<img
								src="/images/three.jpg"
								alt="FedEx luggage shipping"
								className="w-full h-48 object-cover"
							/>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							Ship your luggage ahead
						</h3>
						<p className="text-gray-700 mb-4 flex-grow">
							Skip the hassle of checking bags at the airport. Ship your luggage
							to your destination and travel light. Available for domestic and
							international destinations.
						</p>
						<button className="mt-auto text-black text-left hover:underline font-medium py-2 w-full">
							SHIP LUGGAGE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
