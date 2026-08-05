# PB Photography - Express Backend

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string and other settings

### Development

Run the development server with auto-reload:
```bash
npm run dev
```

The server will start at `http://localhost:5000`

### Production

Run the server:
```bash
npm start
```

### Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── Appointment.js
│   ├── Contact.js
│   ├── Gallery.js
│   ├── Service.js
│   ├── Event.js
│   └── Album.js
├── controllers/      # Business logic
│   ├── appointmentController.js
│   ├── contactController.js
│   ├── galleryController.js
│   ├── serviceController.js
│   ├── eventController.js
│   └── albumController.js
├── routes/          # API endpoints
│   ├── appointments.js
│   ├── contact.js
│   ├── gallery.js
│   ├── services.js
│   ├── events.js
│   └── albums.js
├── server.js        # Main server file
└── package.json
```

### API Endpoints

#### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

#### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages
- `GET /api/contact/:id` - Get message by ID
- `DELETE /api/contact/:id` - Delete message

#### Gallery
- `POST /api/gallery` - Create gallery item
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `DELETE /api/gallery/:id` - Delete gallery item

#### Services
- `POST /api/services` - Create service
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Events
- `POST /api/events` - Create event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

#### Albums
- `POST /api/albums` - Create album
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID
- `PUT /api/albums/:id` - Update album
- `DELETE /api/albums/:id` - Delete album

#### Health Check
- `GET /api/health` - Server health status

### Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

### Database Setup

#### MongoDB Atlas (Cloud)
1. Create an account at mongodb.com
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

#### MongoDB Local
```bash
# macOS with Homebrew
brew services start mongodb-community

# Create database
mongosh
use pb-photography
```

### Example Request/Response

#### Create Appointment
```bash
POST http://localhost:5000/api/appointments
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "date": "2024-07-20",
  "type": "wedding",
  "message": "Looking forward to our session!"
}
```

Response:
```json
{
  "message": "Appointment created successfully",
  "appointment": {
    "_id": "64a7c9f8e1f2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "date": "2024-07-20T00:00:00.000Z",
    "type": "wedding",
    "message": "Looking forward to our session!",
    "status": "pending",
    "createdAt": "2024-07-09T10:30:00.000Z",
    "updatedAt": "2024-07-09T10:30:00.000Z"
  }
}
```

### Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **Nodemon** - Auto-reload during development
