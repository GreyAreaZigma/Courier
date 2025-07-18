'use client';
import React, { useState, useEffect } from 'react';
import {
	FiPlus,
	FiArrowLeft,
	FiCalendar,
	FiMapPin,
	FiClock,
} from 'react-icons/fi';
import Link from 'next/link';

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

interface ShipmentDetailClientProps {
	params: Promise<{ id: string }>;
}

const ShipmentDetailClient = ({ params }: ShipmentDetailClientProps) => {
	const [shipment, setShipment] = useState<Shipment | null>(null);
	const [loading, setLoading] = useState(true);
	const [showAddEventModal, setShowAddEventModal] = useState(false);
	const [eventForm, setEventForm] = useState({
		eventType: '',
		location: '',
		description: '',
		timestamp: new Date().toISOString().slice(0, 16),
	});
	const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
		null
	);

	useEffect(() => {
		// Resolve the params promise
		params.then(setResolvedParams);
	}, [params]);

	useEffect(() => {
		if (resolvedParams) {
			fetchShipment();
		}
	}, [resolvedParams]);

	const fetchShipment = async () => {
		if (!resolvedParams) return;

		try {
			const response = await fetch(`/api/shipments/${resolvedParams.id}`);
			if (response.ok) {
				const data = await response.json();
				setShipment(data);
			}
		} catch (error) {
			console.error('Error fetching shipment:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleAddEvent = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!resolvedParams) return;

		try {
			const response = await fetch(
				`/api/shipments/${resolvedParams.id}/events`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(eventForm),
				}
			);

			if (response.ok) {
				setShowAddEventModal(false);
				setEventForm({
					eventType: '',
					location: '',
					description: '',
					timestamp: new Date().toISOString().slice(0, 16),
				});
				fetchShipment();
			}
		} catch (error) {
			console.error('Error adding event:', error);
		}
	};

	const updateShipmentStatus = async (newStatus: string) => {
		if (!resolvedParams) return;

		try {
			const response = await fetch(`/api/shipments/${resolvedParams.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus }),
			});

			if (response.ok) {
				fetchShipment();
			}
		} catch (error) {
			console.error('Error updating status:', error);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
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

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-xl">Loading shipment details...</div>
			</div>
		);
	}

	if (!shipment) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="text-xl text-red-600 mb-4">Shipment Not Found</div>
					<Link href="/admin" className="text-purple-600 hover:text-purple-800">
						Back to Dashboard
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-4">
						<Link
							href="/admin"
							className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
						>
							<FiArrowLeft /> Back to Dashboard
						</Link>
						<h1 className="text-3xl font-bold text-gray-900">
							Shipment: {shipment.trackingId}
						</h1>
					</div>
					<button
						onClick={() => setShowAddEventModal(true)}
						className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
					>
						<FiPlus /> Add Tracking Event
					</button>
				</div>

				{/* Shipment Info Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white p-6 rounded-lg shadow">
						<div className="flex items-center gap-3 mb-4">
							<FiMapPin className="text-purple-600" />
							<h3 className="text-lg font-medium text-gray-900">Route</h3>
						</div>
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								From: {shipment.fromLocation}
							</p>
							<p className="text-sm text-gray-600">To: {shipment.toLocation}</p>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow">
						<div className="flex items-center gap-3 mb-4">
							<FiCalendar className="text-purple-600" />
							<h3 className="text-lg font-medium text-gray-900">Delivery</h3>
						</div>
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								Date:{' '}
								{shipment.estimatedDelivery
									? formatDate(shipment.estimatedDelivery)
									: 'TBD'}
							</p>
							<p className="text-sm text-gray-600">
								Time:{' '}
								{shipment.deliveryStartTime && shipment.deliveryEndTime
									? `${shipment.deliveryStartTime} - ${shipment.deliveryEndTime}`
									: 'TBD'}
							</p>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow">
						<div className="flex items-center gap-3 mb-4">
							<FiClock className="text-purple-600" />
							<h3 className="text-lg font-medium text-gray-900">Status</h3>
						</div>
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								Current:{' '}
								<span className="font-medium capitalize">
									{shipment.status.replace('_', ' ')}
								</span>
							</p>
							<p className="text-sm text-gray-600">
								Signature:{' '}
								{shipment.signatureRequired ? 'Required' : 'Not Required'}
							</p>
						</div>
					</div>
				</div>

				{/* Status Update Buttons */}
				<div className="bg-white p-6 rounded-lg shadow mb-8">
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						Update Status
					</h3>
					<div className="flex flex-wrap gap-3">
						<button
							onClick={() => updateShipmentStatus('pending')}
							className={`px-4 py-2 rounded-md text-sm font-medium ${
								shipment.status === 'pending'
									? 'bg-gray-600 text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							Pending
						</button>
						<button
							onClick={() => updateShipmentStatus('in_transit')}
							className={`px-4 py-2 rounded-md text-sm font-medium ${
								shipment.status === 'in_transit'
									? 'bg-yellow-600 text-white'
									: 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'
							}`}
						>
							In Transit
						</button>
						<button
							onClick={() => updateShipmentStatus('out_for_delivery')}
							className={`px-4 py-2 rounded-md text-sm font-medium ${
								shipment.status === 'out_for_delivery'
									? 'bg-blue-600 text-white'
									: 'bg-blue-200 text-blue-700 hover:bg-blue-300'
							}`}
						>
							Out for Delivery
						</button>
						<button
							onClick={() => updateShipmentStatus('delivered')}
							className={`px-4 py-2 rounded-md text-sm font-medium ${
								shipment.status === 'delivered'
									? 'bg-green-600 text-white'
									: 'bg-green-200 text-green-700 hover:bg-green-300'
							}`}
						>
							Delivered
						</button>
					</div>
				</div>

				{/* Tracking Events Timeline */}
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium text-gray-900 mb-6">
						Tracking Events
					</h3>
					<div className="space-y-4">
						{shipment.events
							.sort((a, b) => a.order - b.order)
							.map((event) => (
								<div key={event.id} className="flex items-start gap-4">
									<div className="w-3 h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
									<div className="flex-1">
										<p className="font-medium text-gray-900">
											{event.description}
										</p>
										<p className="text-sm text-gray-600">{event.location}</p>
										<p className="text-xs text-gray-500">
											{formatDate(event.timestamp)} at{' '}
											{formatTime(event.timestamp)}
										</p>
									</div>
									<span
										className={`px-2 py-1 text-xs rounded-full ${
											event.status === 'completed'
												? 'bg-green-100 text-green-800'
												: event.status === 'in_progress'
												? 'bg-yellow-100 text-yellow-800'
												: 'bg-gray-100 text-gray-800'
										}`}
									>
										{event.status.replace('_', ' ')}
									</span>
								</div>
							))}
					</div>
				</div>

				{/* Add Event Modal */}
				{showAddEventModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white p-6 rounded-lg w-full max-w-md">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Add Tracking Event
							</h3>
							<form onSubmit={handleAddEvent} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Event Type
									</label>
									<select
										value={eventForm.eventType}
										onChange={(e) =>
											setEventForm({
												...eventForm,
												eventType: e.target.value,
											})
										}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
									>
										<option value="">Select event type</option>
										<option value="package_received">Package Received</option>
										<option value="in_transit">In Transit</option>
										<option value="out_for_delivery">Out for Delivery</option>
										<option value="delivered">Delivered</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Location
									</label>
									<input
										type="text"
										value={eventForm.location}
										onChange={(e) =>
											setEventForm({
												...eventForm,
												location: e.target.value,
											})
										}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
										placeholder="Enter location"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Description
									</label>
									<input
										type="text"
										value={eventForm.description}
										onChange={(e) =>
											setEventForm({
												...eventForm,
												description: e.target.value,
											})
										}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
										placeholder="Enter description"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Timestamp
									</label>
									<input
										type="datetime-local"
										value={eventForm.timestamp}
										onChange={(e) =>
											setEventForm({
												...eventForm,
												timestamp: e.target.value,
											})
										}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
									/>
								</div>
								<div className="flex gap-3">
									<button
										type="submit"
										className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
									>
										Add Event
									</button>
									<button
										type="button"
										onClick={() => setShowAddEventModal(false)}
										className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShipmentDetailClient;
