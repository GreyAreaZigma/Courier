import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function testAuthentication() {
	try {
		console.log('Testing authentication system...');

		// Test 1: Check if users exist
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		});

		console.log('Users in database:', users);

		// Test 2: Test password verification
		const testUser = await prisma.user.findUnique({
			where: { email: 'admin@fedex.com' },
		});

		if (testUser && testUser.password) {
			const isValid = await bcrypt.compare('admin123', testUser.password);
			console.log(
				'Admin password verification:',
				isValid ? 'PASSED' : 'FAILED'
			);
		}

		// Test 3: Test regular user
		const regularUser = await prisma.user.findUnique({
			where: { email: 'user@example.com' },
		});

		if (regularUser && regularUser.password) {
			const isValid = await bcrypt.compare('user123456', regularUser.password);
			console.log(
				'Regular user password verification:',
				isValid ? 'PASSED' : 'FAILED'
			);
		}

		console.log('Authentication test completed successfully!');
	} catch (error) {
		console.error('Authentication test failed:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Run the test if this file is executed directly
if (require.main === module) {
	testAuthentication();
}
