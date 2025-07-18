import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '../../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

declare module 'next-auth' {
	interface User {
		role?: string;
	}
	interface Session {
		user: {
			id?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		role?: string;
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email or User ID', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Please provide both email/user ID and password');
				}

				try {
					// Check if the input is an email or custom user ID
					const isEmail = credentials.email.includes('@');

					let user;

					if (isEmail) {
						// Search by email
						user = await prisma.user.findUnique({
							where: {
								email: credentials.email.toLowerCase(),
							},
						});
					} else {
						// For now, we'll search by email since we don't have a separate user ID field
						// In the future, you might want to add a custom user ID field to the User model
						user = await prisma.user.findFirst({
							where: {
								OR: [
									{ email: credentials.email.toLowerCase() },
									// Add custom user ID search when you implement it
									// { customUserId: credentials.email }
								],
							},
						});
					}

					if (!user || !user.password) {
						throw new Error('Invalid credentials');
					}

					const isPasswordValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isPasswordValid) {
						throw new Error('Invalid credentials');
					}

					// Log successful login (for debugging)
					console.log(`User logged in: ${user.email}`);

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
					};
				} catch (error) {
					console.error('Authentication error:', error);
					throw error;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role as string;
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
	debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
