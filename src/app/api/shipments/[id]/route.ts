import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

// GET /api/shipments/[id] - Get specific shipment
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const shipment = await prisma.shipment.findUnique({
			where: { id: params.id },
			include: {
				events: {
					orderBy: { order: 'asc' },
				},
				managedBy: {
					select: { name: true, email: true },
				},
			},
		});

		if (!shipment) {
			return NextResponse.json(
				{ error: 'Shipment not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(shipment);
	} catch (error) {
		console.error('Error fetching shipment:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch shipment' },
			{ status: 500 }
		);
	}
}

// PUT /api/shipments/[id] - Update shipment
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await request.json();
		const {
			status,
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
		} = body;

		const shipment = await prisma.shipment.update({
			where: { id: params.id },
			data: {
				status,
				estimatedDelivery: estimatedDelivery
					? new Date(estimatedDelivery)
					: null,
				deliveryStartTime,
				deliveryEndTime,
				signatureRequired,
				serviceType,
				terms,
				weight,
				dimensions,
				totalPieces,
				packaging,
			},
			include: {
				events: {
					orderBy: { order: 'asc' },
				},
				managedBy: {
					select: { name: true, email: true },
				},
			},
		});

		return NextResponse.json(shipment);
	} catch (error) {
		console.error('Error updating shipment:', error);
		return NextResponse.json(
			{ error: 'Failed to update shipment' },
			{ status: 500 }
		);
	}
}

// DELETE /api/shipments/[id] - Delete shipment
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await prisma.shipment.delete({
			where: { id: params.id },
		});

		return NextResponse.json({ message: 'Shipment deleted successfully' });
	} catch (error) {
		console.error('Error deleting shipment:', error);
		return NextResponse.json(
			{ error: 'Failed to delete shipment' },
			{ status: 500 }
		);
	}
}
