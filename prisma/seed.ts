import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	// Create admin user
	const adminPassword = await bcrypt.hash('admin123', 12);
	const adminUser = await prisma.user.upsert({
		where: { email: 'admin@fedex.com' },
		update: {},
		create: {
			email: 'admin@fedex.com',
			name: 'Admin User',
			password: adminPassword,
			role: 'admin',
		},
	});

	console.log('Admin user created:', adminUser.email);

	// Create regular user for testing
	const userPassword = await bcrypt.hash('user123456', 12);
	const regularUser = await prisma.user.upsert({
		where: { email: 'user@example.com' },
		update: {},
		create: {
			email: 'user@example.com',
			name: 'John Doe',
			password: userPassword,
			role: 'user',
		},
	});

	console.log('Regular user created:', regularUser.email);

	// Create sample shipments
	const shipment1 = await prisma.shipment.create({
		data: {
			trackingId: '882643599240',
			status: 'out_for_delivery',
			fromLocation: 'Waco, TX US',
			toLocation: 'Bristol, TN US',
			estimatedDelivery: new Date('2024-01-15'),
			deliveryStartTime: '11:30',
			deliveryEndTime: '15:30',
			signatureRequired: false,
			events: {
				create: [
					{
						eventType: 'label_created',
						location: 'Waco, TX US',
						description: 'Label Created',
						status: 'completed',
						order: 1,
						timestamp: new Date('2024-01-09T12:37:00Z'),
					},
					{
						eventType: 'package_received',
						location: 'HEWITT, TX',
						description: 'We have your package',
						status: 'completed',
						order: 2,
						timestamp: new Date('2024-01-09T16:05:00Z'),
					},
					{
						eventType: 'in_transit',
						location: 'HUTCHINS, TX',
						description: 'Departed FedEx location',
						status: 'completed',
						order: 3,
						timestamp: new Date('2024-01-11T09:34:00Z'),
					},
				],
			},
		},
	});

	const shipment2 = await prisma.shipment.create({
		data: {
			trackingId: '123456789012',
			status: 'in_transit',
			fromLocation: 'Los Angeles, CA US',
			toLocation: 'New York, NY US',
			estimatedDelivery: new Date('2024-01-18'),
			deliveryStartTime: '09:00',
			deliveryEndTime: '17:00',
			signatureRequired: true,
			events: {
				create: [
					{
						eventType: 'label_created',
						location: 'Los Angeles, CA US',
						description: 'Label Created',
						status: 'completed',
						order: 1,
						timestamp: new Date('2024-01-12T10:00:00Z'),
					},
					{
						eventType: 'package_received',
						location: 'LOS ANGELES, CA',
						description: 'Package picked up',
						status: 'completed',
						order: 2,
						timestamp: new Date('2024-01-12T14:30:00Z'),
					},
				],
			},
		},
	});

	const shipment3 = await prisma.shipment.create({
		data: {
			trackingId: '987654321098',
			status: 'delivered',
			fromLocation: 'Miami, FL US',
			toLocation: 'Orlando, FL US',
			estimatedDelivery: new Date('2024-01-10'),
			deliveryStartTime: '08:00',
			deliveryEndTime: '18:00',
			signatureRequired: false,
			events: {
				create: [
					{
						eventType: 'label_created',
						location: 'Miami, FL US',
						description: 'Label Created',
						status: 'completed',
						order: 1,
						timestamp: new Date('2024-01-08T09:15:00Z'),
					},
					{
						eventType: 'package_received',
						location: 'MIAMI, FL',
						description: 'Package received at facility',
						status: 'completed',
						order: 2,
						timestamp: new Date('2024-01-08T11:45:00Z'),
					},
					{
						eventType: 'in_transit',
						location: 'MIAMI, FL',
						description: 'In transit to destination',
						status: 'completed',
						order: 3,
						timestamp: new Date('2024-01-09T06:20:00Z'),
					},
					{
						eventType: 'out_for_delivery',
						location: 'ORLANDO, FL',
						description: 'Out for delivery',
						status: 'completed',
						order: 4,
						timestamp: new Date('2024-01-10T08:30:00Z'),
					},
					{
						eventType: 'delivered',
						location: 'ORLANDO, FL',
						description: 'Delivered',
						status: 'completed',
						order: 5,
						timestamp: new Date('2024-01-10T14:22:00Z'),
					},
				],
			},
		},
	});

	console.log('Sample shipments created:');
	console.log('- 882643599240 (Out for Delivery)');
	console.log('- 123456789012 (In Transit)');
	console.log('- 987654321098 (Delivered)');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
