import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

// GET /api/track/[trackingId] - Get shipment by tracking ID
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ trackingId: string }> }
) {
	try {
		const { trackingId } = await params;
		const shipment = await prisma.shipment.findUnique({
			where: { trackingId },
			include: {
				events: {
					orderBy: { order: 'asc' },
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
