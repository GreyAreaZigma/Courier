'use client';

import Image from 'next/image';
import { Package, Package2, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	children?: React.ReactNode;
}

const HeroSection = ({
	activeTab,
	setActiveTab,
	children,
}: HeroSectionProps) => {
	const [trackingNumber, setTrackingNumber] = useState('');
	const router = useRouter();
	const heroHeight = activeTab === 'rate' ? 'h-[40vh]' : 'h-[65vh] md:h-[75vh]';

	const handleTrack = () => {
		if (trackingNumber.trim()) {
			router.push(
				`/fedextrack?trackingId=${encodeURIComponent(trackingNumber.trim())}`
			);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleTrack();
		}
	};

	return (
		<div className={`relative ${heroHeight} w-full`}>
			{/* Background Images */}
			<div className="absolute inset-0 z-0">
				{/* Mobile Image */}
				<div className="md:hidden h-full w-full">
					<Image
						src="/images/hero.jpg"
						alt="FedEx mobile background"
						fill
						style={{ objectFit: 'cover' }}
						quality={100}
						priority
						className="brightness-75"
					/>
				</div>
				{/* Desktop Image */}
				<div className="hidden md:block h-full w-full">
					<Image
						src="/images/heroD.jpg"
						alt="FedEx desktop background"
						fill
						style={{ objectFit: 'cover' }}
						quality={100}
						priority
						className="brightness-100"
					/>
				</div>
			</div>

			{/* Hero Content */}
			<div className="relative z-20 h-full flex flex-col items-center justify-start pt-24">
				<h1 className="text-3xl md:text-[2.75rem] text-white text-center px-4 mb-4">
					Ship, manage, track, deliver
				</h1>

				{/* Tab Buttons */}
				<div className="mt-8">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center">
							<button
								onClick={() => setActiveTab('rate')}
								className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-200 min-w-[100px] sm:min-w-[130px] md:min-w-[160px] h-[80px] sm:h-[100px] md:h-[120px] ${
									activeTab === 'rate'
										? 'bg-purple-700 text-white'
										: 'bg-white text-gray-700 hover:shadow-xl'
								}`}
							>
								<Package className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
								<span className="text-xs sm:text-sm font-semibold text-center leading-tight">
									RATE & SHIP
								</span>
							</button>

							<button
								onClick={() => setActiveTab('track')}
								className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-200 min-w-[100px] sm:min-w-[130px] md:min-w-[160px] h-[80px] sm:h-[100px] md:h-[120px] ${
									activeTab === 'track'
										? 'bg-purple-700 text-white'
										: 'bg-white text-gray-700 hover:shadow-xl'
								}`}
							>
								<Package2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
								<span className="text-xs sm:text-sm font-semibold">TRACK</span>
							</button>

							<button
								onClick={() => setActiveTab('locations')}
								className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-200 min-w-[100px] sm:min-w-[130px] md:min-w-[160px] h-[80px] sm:h-[100px] md:h-[120px] ${
									activeTab === 'locations'
										? 'bg-purple-700 text-white'
										: 'bg-white text-gray-700 hover:shadow-xl'
								}`}
							>
								<MapPin className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
								<span className="text-xs sm:text-sm font-semibold">
									LOCATIONS
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* Tracking Input - Show when track tab is active */}
				{activeTab === 'track' && (
					<div className="w-full max-w-2xl mx-auto mt-8 px-4">
						<div className="flex items-center justify-center">
							<input
								type="text"
								value={trackingNumber}
								onChange={(e) => setTrackingNumber(e.target.value)}
								onKeyPress={handleKeyPress}
								className="w-2/3 px-4 py-3 text-base border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-l-md"
								placeholder="Enter tracking number"
							/>
							<button
								onClick={handleTrack}
								className="ml-2 bg-orange-500 text-white px-4 py-3 text-sm md:text-base hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center"
							>
								TRACK
								<ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
							</button>
						</div>
					</div>
				)}

				{/* Render other content */}
				{children}
			</div>
		</div>
	);
};

export default HeroSection;
