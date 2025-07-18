import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const {
			name,
			email,
			password,
			firstName,
			lastName,
			country,
			address,
			countryCode,
			phone,
			marketingUpdates,
		} = await request.json();

		// Validate required fields
		if (!name || !email || !password) {
			return NextResponse.json(
				{
					error:
						'Missing required fields: name, email, and password are required',
				},
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Validate password strength
		if (password.length < 12 || password.length > 25) {
			return NextResponse.json(
				{ error: 'Password must be between 12 and 25 characters' },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User with this email already exists' },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user with additional information
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: 'user', // Default role
				// Store additional information in a structured way
				// You might want to create a separate UserProfile model for this
				// For now, we'll store it as part of the user data
			},
		});

		// Log successful signup (for debugging)
		console.log(`New user created: ${email}`);

		return NextResponse.json(
			{
				message: 'User created successfully',
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Signup error:', error);

		// Handle specific database errors
		if (error instanceof Error) {
			if (error.message.includes('Unique constraint')) {
				return NextResponse.json(
					{ error: 'User with this email already exists' },
					{ status: 400 }
				);
			}
		}

		return NextResponse.json(
			{ error: 'Internal server error. Please try again later.' },
			{ status: 500 }
		);
	}
}
