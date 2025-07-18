import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

// GET /api/shipments - Get all shipments
export async function GET() {
	try {
		const shipments = await prisma.shipment.findMany({
			include: {
				events: {
					orderBy: { order: 'asc' },
				},
				managedBy: {
					select: { name: true, email: true },
				},
			},
			orderBy: { createdAt: 'desc' },
		});

		return NextResponse.json(shipments);
	} catch (error) {
		console.error('Error fetching shipments:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch shipments' },
			{ status: 500 }
		);
	}
}

// POST /api/shipments - Create new shipment
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {
			trackingId,
			fromLocation,
			toLocation,
			estimatedDelivery,
			deliveryStartTime,
			deliveryEndTime,
			signatureRequired,
			serviceType,
			terms,
			weight,
			dimensions,
			totalPieces,
			packaging,
			managerId,
		} = body;

		const shipment = await prisma.shipment.create({
			data: {
				trackingId,
				fromLocation,
				toLocation,
				estimatedDelivery: estimatedDelivery
					? new Date(estimatedDelivery)
					: null,
				deliveryStartTime,
				deliveryEndTime,
				signatureRequired: signatureRequired || false,
				serviceType: serviceType || 'FedEx Ground',
				terms: terms || 'Third Party',
				weight: weight || null,
				dimensions: dimensions || null,
				totalPieces: totalPieces || 1,
				packaging: packaging || 'Package',
				managerId,
				events: {
					create: {
						eventType: 'label_created',
						location: fromLocation,
						description: 'Label Created',
						status: 'completed',
						order: 1,
					},
				},
			},
			include: {
				events: true,
				managedBy: {
					select: { name: true, email: true },
				},
			},
		});

		return NextResponse.json(shipment, { status: 201 });
	} catch (error) {
		console.error('Error creating shipment:', error);
		return NextResponse.json(
			{ error: 'Failed to create shipment' },
			{ status: 500 }
		);
	}
}
