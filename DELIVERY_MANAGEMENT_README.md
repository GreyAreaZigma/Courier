# FedEx Delivery Management System

A comprehensive delivery management system with admin dashboard for managing shipments and tracking information.

## Features

### Admin Dashboard (`/admin`)

- **Shipment Management**: Create, edit, and delete shipments
- **Real-time Status Updates**: Update shipment status (pending, in_transit, out_for_delivery, delivered)
- **Tracking Events**: Add detailed tracking events with timestamps and locations
- **Statistics**: View shipment counts by status
- **Bulk Operations**: Manage multiple shipments efficiently

### Customer Tracking Page (`/fedextrack`)

- **Real-time Data**: Fetches live data from the backend
- **Dynamic Timeline**: Shows tracking events in chronological order
- **Status Indicators**: Visual status indicators with appropriate colors
- **Responsive Design**: Works on desktop and mobile devices

### API Endpoints

- `GET /api/shipments` - Get all shipments
- `POST /api/shipments` - Create new shipment
- `GET /api/shipments/[id]` - Get specific shipment
- `PUT /api/shipments/[id]` - Update shipment
- `DELETE /api/shipments/[id]` - Delete shipment
- `GET /api/shipments/[id]/events` - Get tracking events
- `POST /api/shipments/[id]/events` - Add tracking event
- `GET /api/track/[trackingId]` - Public tracking endpoint

## Database Schema

### Shipment Model

```prisma
model Shipment {
  id                String   @id @default(cuid())
  trackingId        String   @unique
  status            String   @default("pending")
  estimatedDelivery DateTime?
  deliveryStartTime String?
  deliveryEndTime   String?
  signatureRequired Boolean  @default(false)
  fromLocation      String
  toLocation        String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  events            TrackingEvent[]
  managedBy         User?    @relation(fields: [managerId], references: [id])
  managerId         String?
}
```

### TrackingEvent Model

```prisma
model TrackingEvent {
  id          String   @id @default(cuid())
  shipmentId  String
  shipment    Shipment @relation(fields: [shipmentId], references: [id], onDelete: Cascade)
  eventType   String
  location    String
  description String
  timestamp   DateTime @default(now())
  status      String
  order       Int
}
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

### 3. Environment Variables

Create a `.env.local` file with your database connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/feddex"
```

### 4. Start Development Server

```bash
npm run dev
```

## Usage Guide

### For Delivery Managers (Admins)

1. **Access Admin Dashboard**

   - Navigate to `/admin`
   - View all shipments with their current status

2. **Create New Shipment**

   - Click "New Shipment" button
   - Fill in tracking ID, locations, delivery details
   - Set signature requirements

3. **Manage Existing Shipments**

   - Click the edit icon (pencil) next to any shipment
   - Update shipment details, delivery times, status
   - Add tracking events with timestamps and locations

4. **Add Tracking Events**

   - In the shipment detail page, click "Add Tracking Event"
   - Select event type (package_received, in_transit, out_for_delivery, delivered)
   - Enter location and description
   - Set timestamp

5. **Update Shipment Status**
   - Use the status buttons in the shipment detail page
   - Statuses: Pending → In Transit → Out for Delivery → Delivered

### For Customers

1. **View Tracking Information**

   - Navigate to `/fedextrack?trackingId=YOUR_TRACKING_ID`
   - View real-time delivery status and timeline
   - See estimated delivery date and time window

2. **Sample Tracking IDs**
   - `882643599240` - Out for Delivery
   - `123456789012` - In Transit
   - `987654321098` - Delivered

## Sample Data

The seed script creates three sample shipments:

1. **882643599240** - Out for Delivery

   - From: Waco, TX US
   - To: Bristol, TN US
   - Status: Out for Delivery
   - Events: Label Created, Package Received, In Transit

2. **123456789012** - In Transit

   - From: Los Angeles, CA US
   - To: New York, NY US
   - Status: In Transit
   - Events: Label Created, Package Received

3. **987654321098** - Delivered
   - From: Miami, FL US
   - To: Orlando, FL US
   - Status: Delivered
   - Events: Complete delivery timeline

## API Examples

### Create Shipment

```bash
curl -X POST http://localhost:3000/api/shipments \
  -H "Content-Type: application/json" \
  -d '{
    "trackingId": "123456789",
    "fromLocation": "New York, NY US",
    "toLocation": "Los Angeles, CA US",
    "estimatedDelivery": "2024-01-20",
    "deliveryStartTime": "09:00",
    "deliveryEndTime": "17:00",
    "signatureRequired": false
  }'
```

### Add Tracking Event

```bash
curl -X POST http://localhost:3000/api/shipments/SHIPMENT_ID/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "package_received",
    "location": "NEW YORK, NY",
    "description": "Package received at facility",
    "timestamp": "2024-01-15T10:30:00Z"
  }'
```

### Get Shipment by Tracking ID

```bash
curl http://localhost:3000/api/track/882643599240
```

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard
│   │   └── [id]/
│   │       └── page.tsx          # Shipment detail page
│   ├── api/
│   │   ├── shipments/
│   │   │   ├── route.ts          # Shipment CRUD
│   │   │   └── [id]/
│   │   │       ├── route.ts      # Individual shipment operations
│   │   │       └── events/
│   │   │           └── route.ts  # Tracking events
│   │   └── track/
│   │       └── [trackingId]/
│   │           └── route.ts      # Public tracking API
│   └── fedextrack/
│       └── page.tsx              # Customer tracking page
└── components/                   # Reusable components
```

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: React Icons (Feather Icons)
- **Styling**: Tailwind CSS

## Future Enhancements

- User authentication and role-based access
- Email notifications for status updates
- Mobile app for delivery drivers
- Real-time notifications using WebSockets
- Integration with actual FedEx API
- Advanced analytics and reporting
- Bulk import/export functionality
- Customer feedback and ratings system
