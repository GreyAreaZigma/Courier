'use client';

import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TabContentProps {
	activeTab: string;
	inHero?: boolean;
}

const TabContent = ({ activeTab, inHero = false }: TabContentProps) => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [trackingNumber, setTrackingNumber] = useState('');
	const [locationSearch, setLocationSearch] = useState('');
	const contentRef = useRef<HTMLDivElement>(null);
	const [residentialAddress, setResidentialAddress] = useState(false);
	const [selectedPackaging, setSelectedPackaging] = useState('');
	const [packageWeight, setPackageWeight] = useState('');
	const [weightUnit, setWeightUnit] = useState('lb');
	const [dimensions, setDimensions] = useState({
		length: '',
		width: '',
		height: '',
	});
	const [dimensionUnit, setDimensionUnit] = useState('in');
	const [shipDate, setShipDate] = useState('Monday, July 7, 2025');
	const [higherLiability, setHigherLiability] = useState(false);
	const router = useRouter();

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

	if (inHero && activeTab !== 'rate') {
		return (
			<div className="w-full max-w-2xl mx-auto mt-4">
				{activeTab === 'track' && (
					<div className="flex items-center justify-center">
						<input
							type="text"
							value={trackingNumber}
							onChange={(e) => setTrackingNumber(e.target.value)}
							onKeyPress={handleKeyPress}
							className="w-2/3 px-4 py-2 text-base border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-l-md"
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
				)}

				{activeTab === 'locations' && (
					<>
						<h3 className="text-base md:text-lg font-medium text-white mb-4 text-center">
							Find FedEx locations - United States
						</h3>
						<div className="flex justify-center items-center flex-wrap">
							<input
								type="text"
								value={locationSearch}
								onChange={(e) => setLocationSearch(e.target.value)}
								className="w-full sm:w-72 md:w-96 px-4 py-4 text-base border border-gray-300 bg-white text-black placeholder:italic focus:outline-none focus:ring-purple-500 focus:border-purple-500"
								placeholder="Find Locations Near..."
							/>
							<button className="bg-orange-600 text-white px-6 py-4 text-sm md:text-base hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
								SEARCH
							</button>
						</div>
					</>
				)}
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
				<div
					ref={contentRef}
					className="bg-white p-6 max-w-4xl mx-auto border-t-4 border-purple-700"
				>
					{renderTabContent()}
				</div>
			</div>
		</div>
	);

	function renderTabContent() {
		switch (activeTab) {
			case 'rate':
				return (
					<div className="mx-auto">
						<h3 className="text-lg md:text-2xl text-center font-medium text-gray-900 mb-2">
							Calculate FedEx shipping rates
						</h3>
						<h4 className="text-xs md:text-sm text-center font-medium text-purple-700 hover:text-purple-800 mb-6">
							Shipping LTL Freight?
						</h4>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										From*
									</label>
									<input
										type="text"
										value={from}
										onChange={(e) => setFrom(e.target.value)}
										className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
										placeholder="Enter origin location"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										To*
									</label>
									<input
										type="text"
										value={to}
										onChange={(e) => setTo(e.target.value)}
										className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
										placeholder="Enter destination location"
									/>
								</div>
							</div>

							{from && to && (
								<div className="bg-blue-50 border border-blue-200 rounded-md p-3">
									<p className="text-sm text-blue-800">
										76180 and 75043 are the closest matches we could find. If
										they&apos;re wrong, you can change them in the fields above.
									</p>
								</div>
							)}

							{from && to && (
								<div className="flex items-center">
									<input
										type="checkbox"
										id="residential"
										checked={residentialAddress}
										onChange={(e) => setResidentialAddress(e.target.checked)}
										className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
									/>
									<label
										htmlFor="residential"
										className="ml-2 text-sm text-gray-700"
									>
										I&apos;m shipping to a residential address
									</label>
								</div>
							)}

							{from && to && (
								<div>
									<h4 className="text-lg font-medium text-gray-900 mb-4">
										Tell us more about your shipment
									</h4>

									<div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
										<div className="flex items-start">
											<div className="flex-1">
												<h5 className="font-medium text-gray-900">
													Flat-rate shipping
												</h5>
												<p className="text-sm text-gray-600 mb-1">
													with FedEx One Rate
												</p>
												<p className="text-sm text-gray-600 mb-2">
													Predictable pricing with free FedEx packaging,
													anywhere in the U.S.
												</p>
												<button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
													Learn more
												</button>
											</div>
										</div>
									</div>

									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Packaging*
										</label>
										<select
											value={selectedPackaging}
											onChange={(e) => setSelectedPackaging(e.target.value)}
											className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
										>
											<option value="">Your Packaging</option>
											<option value="envelope">FedEx Envelope</option>
											<option value="extra-large-box">
												FedEx Extra Large Box
											</option>
											<option value="large-box">FedEx Large Box</option>
											<option value="medium-box">FedEx Medium Box</option>
											<option value="pak">FedEx Pak</option>
											<option value="small-box">FedEx Small Box</option>
											<option value="tube">FedEx Tube</option>
										</select>
									</div>

									<div className="flex items-center mb-4">
										<input
											type="checkbox"
											id="liability"
											checked={higherLiability}
											onChange={(e) => setHigherLiability(e.target.checked)}
											className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
										/>
										<label
											htmlFor="liability"
											className="ml-2 text-sm text-gray-700"
										>
											Purchase a higher limit of liability from FedEx
										</label>
									</div>

									<div className="mb-4">
										<h5 className="text-sm font-medium text-gray-700 mb-2">
											Packages*
										</h5>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Package weight*
												</label>
												<div className="flex">
													<input
														type="number"
														value={packageWeight}
														onChange={(e) => setPackageWeight(e.target.value)}
														className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
														placeholder="0"
													/>
													<select
														value={weightUnit}
														onChange={(e) => setWeightUnit(e.target.value)}
														className="px-3 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
													>
														<option value="lb">lb</option>
														<option value="kg">kg</option>
													</select>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Ship date*
												</label>
												<input
													type="text"
													value={shipDate}
													onChange={(e) => setShipDate(e.target.value)}
													className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Length*
												</label>
												<div className="flex">
													<input
														type="number"
														value={dimensions.length}
														onChange={(e) =>
															setDimensions({
																...dimensions,
																length: e.target.value,
															})
														}
														className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
														placeholder="0"
													/>
													<select
														value={dimensionUnit}
														onChange={(e) => setDimensionUnit(e.target.value)}
														className="px-3 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
													>
														<option value="in">in</option>
														<option value="cm">cm</option>
													</select>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Width*
												</label>
												<div className="flex">
													<input
														type="number"
														value={dimensions.width}
														onChange={(e) =>
															setDimensions({
																...dimensions,
																width: e.target.value,
															})
														}
														className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
														placeholder="0"
													/>
													<select
														value={dimensionUnit}
														onChange={(e) => setDimensionUnit(e.target.value)}
														className="px-3 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
													>
														<option value="in">in</option>
														<option value="cm">cm</option>
													</select>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Height*
												</label>
												<div className="flex">
													<input
														type="number"
														value={dimensions.height}
														onChange={(e) =>
															setDimensions({
																...dimensions,
																height: e.target.value,
															})
														}
														className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
														placeholder="0"
													/>
													<select
														value={dimensionUnit}
														onChange={(e) => setDimensionUnit(e.target.value)}
														className="px-3 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
													>
														<option value="in">in</option>
														<option value="cm">cm</option>
													</select>
												</div>
											</div>
										</div>
									</div>

									<div className="flex justify-center">
										<button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md transition-colors">
											Get Rates
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				);

			case 'track':
				return (
					<div className="mx-auto">
						<h3 className="text-lg md:text-2xl text-center font-medium text-gray-900 mb-6">
							Track your FedEx shipment
						</h3>
						<div className="max-w-md mx-auto">
							<div className="flex items-center">
								<input
									type="text"
									value={trackingNumber}
									onChange={(e) => setTrackingNumber(e.target.value)}
									onKeyPress={handleKeyPress}
									className="flex-1 px-4 py-3 text-base border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-l-md"
									placeholder="Enter tracking number"
								/>
								<button
									onClick={handleTrack}
									className="bg-orange-500 text-white px-6 py-3 text-base hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center rounded-r-md"
								>
									TRACK
									<ArrowRight className="h-5 w-5 ml-2" />
								</button>
							</div>
							<p className="text-sm text-gray-600 mt-4 text-center">
								Enter your tracking number to get real-time updates on your
								shipment
							</p>
						</div>
					</div>
				);

			case 'locations':
				return (
					<div className="mx-auto">
						<h3 className="text-lg md:text-2xl text-center font-medium text-gray-900 mb-6">
							Find FedEx locations
						</h3>
						<div className="max-w-lg mx-auto">
							<div className="flex flex-col sm:flex-row gap-4">
								<input
									type="text"
									value={locationSearch}
									onChange={(e) => setLocationSearch(e.target.value)}
									className="flex-1 px-4 py-3 text-base border border-gray-300 bg-white text-black placeholder:italic focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md"
									placeholder="Find Locations Near..."
								/>
								<button className="bg-orange-600 text-white px-6 py-3 text-base hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md">
									SEARCH
								</button>
							</div>
							<p className="text-sm text-gray-600 mt-4 text-center">
								Find FedEx locations, drop-off points, and retail stores near
								you
							</p>
						</div>
					</div>
				);

			default:
				return null;
		}
	}
};

export default TabContent;
