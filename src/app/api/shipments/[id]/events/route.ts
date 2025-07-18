import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

// GET /api/shipments/[id]/events - Get all events for a shipment
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const events = await prisma.trackingEvent.findMany({
			where: { shipmentId: id },
			orderBy: { order: 'asc' },
		});

		return NextResponse.json(events);
	} catch (error) {
		console.error('Error fetching events:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch events' },
			{ status: 500 }
		);
	}
}

// POST /api/shipments/[id]/events - Add new tracking event
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { eventType, location, description, status, timestamp } = body;

		// Get the next order number
		const lastEvent = await prisma.trackingEvent.findFirst({
			where: { shipmentId: id },
			orderBy: { order: 'desc' },
		});

		const nextOrder = (lastEvent?.order || 0) + 1;

		const event = await prisma.trackingEvent.create({
			data: {
				shipmentId: id,
				eventType,
				location,
				description,
				status: status || 'completed',
				timestamp: timestamp ? new Date(timestamp) : new Date(),
				order: nextOrder,
			},
		});

		return NextResponse.json(event, { status: 201 });
	} catch (error) {
		console.error('Error creating event:', error);
		return NextResponse.json(
			{ error: 'Failed to create event' },
			{ status: 500 }
		);
	}
}
