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

const ShipmentDetail = ({ params }: { params: { id: string } }) => {
	const [shipment, setShipment] = useState<Shipment | null>(null);
	const [loading, setLoading] = useState(true);
	const [showAddEventModal, setShowAddEventModal] = useState(false);
	const [eventForm, setEventForm] = useState({
		eventType: '',
		location: '',
		description: '',
		timestamp: new Date().toISOString().slice(0, 16),
	});

	useEffect(() => {
		fetchShipment();
	}, [params.id]);

	const fetchShipment = async () => {
		try {
			const response = await fetch(`/api/shipments/${params.id}`);
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
		try {
			const response = await fetch(`/api/shipments/${params.id}/events`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(eventForm),
			});

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
		try {
			const response = await fetch(`/api/shipments/${params.id}`, {
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

				{/* Tracking Timeline */}
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium text-gray-900 mb-6">
						Tracking Timeline
					</h3>
					<div className="border-l-2 border-gray-200 pl-6 space-y-6">
						{shipment.events.map((event, index) => (
							<div key={event.id} className="relative">
								<div className="absolute -left-7 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
								<div className="flex flex-col sm:flex-row sm:justify-between">
									<div className="mb-2 sm:mb-0">
										<p className="text-gray-900 font-medium">
											{event.description}
										</p>
										<p className="text-gray-700">{event.location}</p>
										<p className="text-sm text-gray-500">
											Type: {event.eventType}
										</p>
									</div>
									<div className="text-sm text-gray-500">
										<p>{formatDate(event.timestamp)}</p>
										<p>{formatTime(event.timestamp)}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Add Event Modal */}
			{showAddEventModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-bold mb-4">Add Tracking Event</h2>
						<form onSubmit={handleAddEvent}>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Event Type
									</label>
									<select
										required
										value={eventForm.eventType}
										onChange={(e) =>
											setEventForm({ ...eventForm, eventType: e.target.value })
										}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
									>
										<option value="">Select event type</option>
										<option value="package_received">Package Received</option>
										<option value="in_transit">In Transit</option>
										<option value="out_for_delivery">Out for Delivery</option>
										<option value="delivered">Delivered</option>
										<option value="failed">Delivery Failed</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Location
									</label>
									<input
										type="text"
										required
										value={eventForm.location}
										onChange={(e) =>
											setEventForm({ ...eventForm, location: e.target.value })
										}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										placeholder="e.g., HEWITT, TX"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Description
									</label>
									<input
										type="text"
										required
										value={eventForm.description}
										onChange={(e) =>
											setEventForm({
												...eventForm,
												description: e.target.value,
											})
										}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										placeholder="e.g., We have your package"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Timestamp
									</label>
									<input
										type="datetime-local"
										required
										value={eventForm.timestamp}
										onChange={(e) =>
											setEventForm({ ...eventForm, timestamp: e.target.value })
										}
										className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
									/>
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<button
									type="submit"
									className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
								>
									Add Event
								</button>
								<button
									type="button"
									onClick={() => setShowAddEventModal(false)}
									className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShipmentDetail;

