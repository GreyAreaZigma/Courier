'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
	FiPlus,
	FiEdit,
	FiTrash2,
	FiEye,
	FiCalendar,
	FiMapPin,
	FiX,
} from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
	createdAt: string;
	events: TrackingEvent[];
	managedBy?: {
		name: string | null;
		email: string;
	};
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

const AdminDashboard = () => {
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [loading, setLoading] = useState(true);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
		null
	);
	const [formData, setFormData] = useState({
		trackingId: '',
		fromLocation: '',
		toLocation: '',
		estimatedDelivery: '',
		deliveryStartTime: '',
		deliveryEndTime: '',
		signatureRequired: false,
		serviceType: 'FedEx Ground',
		terms: 'Third Party',
		weight: '',
		dimensions: '',
		totalPieces: 1,
		packaging: 'Package',
	});
	const [showPackageDetails, setShowPackageDetails] = useState(false);

	const { data: session, status } = useSession();
	const router = useRouter();

	// Function to generate 12 random numbers
	const generateTrackingId = () => {
		return Math.floor(Math.random() * 900000000000) + 100000000000; // Generates 12-digit number
	};

	// Function to handle opening the create modal with generated tracking ID
	const handleOpenCreateModal = () => {
		const newTrackingId = generateTrackingId().toString();
		setFormData({
			...formData,
			trackingId: newTrackingId,
		});
		setShowCreateModal(true);
	};

	// Check authentication and admin role
	useEffect(() => {
		if (status === 'loading') return;
		if (!session) {
			router.push('/login');
			return;
		}
		if (session.user?.role !== 'admin') {
			router.push('/');
			return;
		}
	}, [session, status, router]);

	useEffect(() => {
		fetchShipments();
	}, []);

	const fetchShipments = async () => {
		try {
			const response = await fetch('/api/shipments');
			const data = await response.json();
			setShipments(data);
		} catch (error) {
			console.error('Error fetching shipments:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateShipment = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/shipments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				setShowCreateModal(false);
				setFormData({
					trackingId: '',
					fromLocation: '',
					toLocation: '',
					estimatedDelivery: '',
					deliveryStartTime: '',
					deliveryEndTime: '',
					signatureRequired: false,
					serviceType: 'FedEx Ground',
					terms: 'Third Party',
					weight: '',
					dimensions: '',
					totalPieces: 1,
					packaging: 'Package',
				});
				fetchShipments();
			}
		} catch (error) {
			console.error('Error creating shipment:', error);
		}
	};

	const handleUpdateShipment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedShipment) return;
		try {
			const response = await fetch(`/api/shipments/${selectedShipment.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				setShowEditModal(false);
				setSelectedShipment(null);
				fetchShipments();
			}
		} catch (error) {
			console.error('Error updating shipment:', error);
		}
	};

	const handleDeleteShipment = async (id: string) => {
		if (!confirm('Are you sure you want to delete this shipment?')) return;
		try {
			const response = await fetch(`/api/shipments/${id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				fetchShipments();
			}
		} catch (error) {
			console.error('Error deleting shipment:', error);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'delivered':
				return 'bg-green-100 text-green-800';
			case 'out_for_delivery':
				return 'bg-blue-100 text-blue-800';
			case 'in_transit':
				return 'bg-yellow-100 text-yellow-800';
			case 'pending':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	if (status === 'loading' || loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	if (!session || session.user?.role !== 'admin') {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="text-xl text-red-600 mb-4">Access Denied</div>
					<div className="text-gray-600">
						You need admin privileges to access this page.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Delivery Manager Dashboard
						</h1>
						{session && (
							<p className="text-gray-600 mt-1">
								Welcome back, {session.user?.name || session.user?.email}!
							</p>
						)}
					</div>
					<button
						onClick={handleOpenCreateModal}
						className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
					>
						<FiPlus /> New Shipment
					</button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-sm font-medium text-gray-500">
							Total Shipments
						</h3>
						<p className="text-3xl font-bold text-gray-900">
							{shipments.length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-sm font-medium text-gray-500">In Transit</h3>
						<p className="text-3xl font-bold text-yellow-600">
							{shipments.filter((s) => s.status === 'in_transit').length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-sm font-medium text-gray-500">
							Out for Delivery
						</h3>
						<p className="text-3xl font-bold text-blue-600">
							{shipments.filter((s) => s.status === 'out_for_delivery').length}
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-sm font-medium text-gray-500">Delivered</h3>
						<p className="text-3xl font-bold text-green-600">
							{shipments.filter((s) => s.status === 'delivered').length}
						</p>
					</div>
				</div>

				{/* Shipments Table */}
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-lg font-medium text-gray-900">All Shipments</h2>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Tracking ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										From
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										To
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Delivery Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{shipments.map((shipment) => (
									<tr key={shipment.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">
												{shipment.trackingId}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
													shipment.status
												)}`}
											>
												{shipment.status.replace('_', ' ').toUpperCase()}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{shipment.fromLocation}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{shipment.toLocation}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{shipment.estimatedDelivery
												? new Date(
														shipment.estimatedDelivery
												  ).toLocaleDateString()
												: 'Not set'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex gap-2">
												<Link
													href={`/fedextrack?trackingId=${shipment.trackingId}`}
													className="text-blue-600 hover:text-blue-900"
													title="View tracking page"
												>
													<FiEye className="w-4 h-4" />
												</Link>
												<Link
													href={`/admin/${shipment.id}`}
													className="text-green-600 hover:text-green-900"
													title="Manage shipment"
												>
													<FiEdit className="w-4 h-4" />
												</Link>
												<button
													onClick={() => {
														setSelectedShipment(shipment);
														setFormData({
															trackingId: shipment.trackingId,
															fromLocation: shipment.fromLocation,
															toLocation: shipment.toLocation,
															estimatedDelivery: shipment.estimatedDelivery
																? new Date(shipment.estimatedDelivery)
																		.toISOString()
																		.split('T')[0]
																: '',
															deliveryStartTime:
																shipment.deliveryStartTime || '',
															deliveryEndTime: shipment.deliveryEndTime || '',
															signatureRequired: shipment.signatureRequired,
															serviceType:
																shipment.serviceType || 'FedEx Ground',
															terms: shipment.terms || 'Third Party',
															weight: shipment.weight || '',
															dimensions: shipment.dimensions || '',
															totalPieces: shipment.totalPieces || 1,
															packaging: shipment.packaging || 'Package',
														});
														// Show package details if any package info exists
														setShowPackageDetails(
															!!(
																shipment.weight ||
																shipment.dimensions ||
																shipment.totalPieces > 1 ||
																shipment.packaging !== 'Package'
															)
														);
														setShowEditModal(true);
													}}
													className="text-yellow-600 hover:text-yellow-900"
												>
													<FiEdit className="w-4 h-4" />
												</button>
												<button
													onClick={() => handleDeleteShipment(shipment.id)}
													className="text-red-600 hover:text-red-900"
												>
													<FiTrash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Create Shipment Modal */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
						{/* Modal Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
							<h2 className="text-2xl font-bold text-white">
								Create New Shipment
							</h2>
							<button
								onClick={() => setShowCreateModal(false)}
								className="text-white hover:text-gray-200 transition-colors"
							>
								<FiX className="w-6 h-6" />
							</button>
						</div>

						{/* Modal Body */}
						<div className="overflow-y-auto max-h-[calc(90vh-140px)]">
							<form onSubmit={handleCreateShipment} className="p-6">
								{/* Tracking ID Section */}
								<div className="mb-8">
									<div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Tracking ID
										</label>
										<input
											type="text"
											required
											readOnly
											value={formData.trackingId}
											className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed font-mono text-lg"
										/>
										<p className="text-xs text-gray-500 mt-2 flex items-center">
											<span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
											Automatically generated 12-digit tracking number
										</p>
									</div>
								</div>

								{/* Location Information */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
										<FiMapPin className="mr-2 text-purple-600" />
										Location Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												From Location *
											</label>
											<input
												type="text"
												required
												value={formData.fromLocation}
												onChange={(e) =>
													setFormData({
														...formData,
														fromLocation: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												placeholder="e.g., New York, NY"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												To Location *
											</label>
											<input
												type="text"
												required
												value={formData.toLocation}
												onChange={(e) =>
													setFormData({
														...formData,
														toLocation: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												placeholder="e.g., Los Angeles, CA"
											/>
										</div>
									</div>
								</div>

								{/* Delivery Schedule */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
										<FiCalendar className="mr-2 text-purple-600" />
										Delivery Schedule
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Estimated Delivery Date
											</label>
											<input
												type="date"
												value={formData.estimatedDelivery}
												onChange={(e) =>
													setFormData({
														...formData,
														estimatedDelivery: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Delivery Start Time
											</label>
											<input
												type="time"
												value={formData.deliveryStartTime}
												onChange={(e) =>
													setFormData({
														...formData,
														deliveryStartTime: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Delivery End Time
											</label>
											<input
												type="time"
												value={formData.deliveryEndTime}
												onChange={(e) =>
													setFormData({
														...formData,
														deliveryEndTime: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											/>
										</div>
									</div>
								</div>

								{/* Service Details */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4">
										Service Details
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Service Type
											</label>
											<select
												value={formData.serviceType}
												onChange={(e) =>
													setFormData({
														...formData,
														serviceType: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											>
												<option value="FedEx Ground">FedEx Ground</option>
												<option value="FedEx Express">FedEx Express</option>
												<option value="FedEx Priority">FedEx Priority</option>
												<option value="FedEx Standard">FedEx Standard</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Terms
											</label>
											<select
												value={formData.terms}
												onChange={(e) =>
													setFormData({
														...formData,
														terms: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											>
												<option value="Third Party">Third Party</option>
												<option value="Prepaid">Prepaid</option>
												<option value="Collect">Collect</option>
											</select>
										</div>
									</div>
									<div className="mt-4">
										<label className="flex items-center">
											<input
												type="checkbox"
												checked={formData.signatureRequired}
												onChange={(e) =>
													setFormData({
														...formData,
														signatureRequired: e.target.checked,
													})
												}
												className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
											/>
											<span className="ml-3 text-sm font-medium text-gray-700">
												Signature Required
											</span>
										</label>
									</div>
								</div>

								{/* Package Details Toggle */}
								<div className="mb-6">
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={showPackageDetails}
											onChange={(e) => setShowPackageDetails(e.target.checked)}
											className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
										/>
										<span className="ml-3 text-sm font-medium text-gray-700">
											Include Package Details (Optional)
										</span>
									</label>
								</div>

								{/* Package Details */}
								{showPackageDetails && (
									<div className="mb-8">
										<h3 className="text-lg font-semibold text-gray-800 mb-4">
											Package Details
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Weight
												</label>
												<input
													type="text"
													value={formData.weight}
													onChange={(e) =>
														setFormData({
															...formData,
															weight: e.target.value,
														})
													}
													placeholder="e.g., 21.2 lbs / 9.62 kgs"
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Dimensions
												</label>
												<input
													type="text"
													value={formData.dimensions}
													onChange={(e) =>
														setFormData({
															...formData,
															dimensions: e.target.value,
														})
													}
													placeholder="e.g., 43x32x1 in."
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Total Pieces
												</label>
												<input
													type="number"
													min="1"
													value={formData.totalPieces}
													onChange={(e) =>
														setFormData({
															...formData,
															totalPieces: Number.parseInt(e.target.value) || 1,
														})
													}
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Packaging
												</label>
												<select
													value={formData.packaging}
													onChange={(e) =>
														setFormData({
															...formData,
															packaging: e.target.value,
														})
													}
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
												>
													<option value="Package">Package</option>
													<option value="Envelope">Envelope</option>
													<option value="Box">Box</option>
													<option value="Pallet">Pallet</option>
												</select>
											</div>
										</div>
									</div>
								)}
							</form>
						</div>

						{/* Modal Footer */}
						<div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50">
							<button
								type="button"
								onClick={() => setShowCreateModal(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								onClick={handleCreateShipment}
								className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-lg font-medium transition-all shadow-lg"
							>
								Create Shipment
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Shipment Modal */}
			{showEditModal && selectedShipment && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
						{/* Modal Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-500 to-yellow-600">
							<h2 className="text-2xl font-bold text-white">Edit Shipment</h2>
							<button
								onClick={() => setShowEditModal(false)}
								className="text-white hover:text-gray-200 transition-colors"
							>
								<FiX className="w-6 h-6" />
							</button>
						</div>

						{/* Modal Body */}
						<div className="overflow-y-auto max-h-[calc(90vh-140px)]">
							<form onSubmit={handleUpdateShipment} className="p-6">
								{/* Tracking ID Section */}
								<div className="mb-8">
									<div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
										<label className="block text-sm font-semibold text-gray-700 mb-2">
											Tracking ID
										</label>
										<input
											type="text"
											required
											value={formData.trackingId}
											onChange={(e) =>
												setFormData({ ...formData, trackingId: e.target.value })
											}
											className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all font-mono text-lg"
										/>
									</div>
								</div>

								{/* Location Information */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
										<FiMapPin className="mr-2 text-yellow-600" />
										Location Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												From Location *
											</label>
											<input
												type="text"
												required
												value={formData.fromLocation}
												onChange={(e) =>
													setFormData({
														...formData,
														fromLocation: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												To Location *
											</label>
											<input
												type="text"
												required
												value={formData.toLocation}
												onChange={(e) =>
													setFormData({
														...formData,
														toLocation: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											/>
										</div>
									</div>
								</div>

								{/* Delivery Schedule */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
										<FiCalendar className="mr-2 text-yellow-600" />
										Delivery Schedule
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Estimated Delivery Date
											</label>
											<input
												type="date"
												value={formData.estimatedDelivery}
												onChange={(e) =>
													setFormData({
														...formData,
														estimatedDelivery: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Delivery Start Time
											</label>
											<input
												type="time"
												value={formData.deliveryStartTime}
												onChange={(e) =>
													setFormData({
														...formData,
														deliveryStartTime: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Delivery End Time
											</label>
											<input
												type="time"
												value={formData.deliveryEndTime}
												onChange={(e) =>
													setFormData({
														...formData,
														deliveryEndTime: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											/>
										</div>
									</div>
								</div>

								{/* Service Details */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 mb-4">
										Service Details
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Service Type
											</label>
											<select
												value={formData.serviceType}
												onChange={(e) =>
													setFormData({
														...formData,
														serviceType: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											>
												<option value="FedEx Ground">FedEx Ground</option>
												<option value="FedEx Express">FedEx Express</option>
												<option value="FedEx Priority">FedEx Priority</option>
												<option value="FedEx Standard">FedEx Standard</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Terms
											</label>
											<select
												value={formData.terms}
												onChange={(e) =>
													setFormData({
														...formData,
														terms: e.target.value,
													})
												}
												className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
											>
												<option value="Third Party">Third Party</option>
												<option value="Prepaid">Prepaid</option>
												<option value="Collect">Collect</option>
											</select>
										</div>
									</div>
									<div className="mt-4">
										<label className="flex items-center">
											<input
												type="checkbox"
												checked={formData.signatureRequired}
												onChange={(e) =>
													setFormData({
														...formData,
														signatureRequired: e.target.checked,
													})
												}
												className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
											/>
											<span className="ml-3 text-sm font-medium text-gray-700">
												Signature Required
											</span>
										</label>
									</div>
								</div>

								{/* Package Details Toggle */}
								<div className="mb-6">
									<label className="flex items-center">
										<input
											type="checkbox"
											checked={showPackageDetails}
											onChange={(e) => setShowPackageDetails(e.target.checked)}
											className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
										/>
										<span className="ml-3 text-sm font-medium text-gray-700">
											Include Package Details (Optional)
										</span>
									</label>
								</div>

								{/* Package Details */}
								{showPackageDetails && (
									<div className="mb-8">
										<h3 className="text-lg font-semibold text-gray-800 mb-4">
											Package Details
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Weight
												</label>
												<input
													type="text"
													value={formData.weight}
													onChange={(e) =>
														setFormData({
															...formData,
															weight: e.target.value,
														})
													}
													placeholder="e.g., 21.2 lbs / 9.62 kgs"
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Dimensions
												</label>
												<input
													type="text"
													value={formData.dimensions}
													onChange={(e) =>
														setFormData({
															...formData,
															dimensions: e.target.value,
														})
													}
													placeholder="e.g., 43x32x1 in."
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Total Pieces
												</label>
												<input
													type="number"
													min="1"
													value={formData.totalPieces}
													onChange={(e) =>
														setFormData({
															...formData,
															totalPieces: Number.parseInt(e.target.value) || 1,
														})
													}
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Packaging
												</label>
												<select
													value={formData.packaging}
													onChange={(e) =>
														setFormData({
															...formData,
															packaging: e.target.value,
														})
													}
													className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
												>
													<option value="Package">Package</option>
													<option value="Envelope">Envelope</option>
													<option value="Box">Box</option>
													<option value="Pallet">Pallet</option>
												</select>
											</div>
										</div>
									</div>
								)}
							</form>
						</div>

						{/* Modal Footer */}
						<div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50">
							<button
								type="button"
								onClick={() => setShowEditModal(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								onClick={handleUpdateShipment}
								className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 px-6 rounded-lg font-medium transition-all shadow-lg"
							>
								Update Shipment
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
