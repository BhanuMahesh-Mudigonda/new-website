# Getting Started with PB Photography

## 🚀 Quick Start Guide

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup Backend Environment

```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pb-photography
NODE_ENV=development
```

**For MongoDB Atlas (recommended):**
- Go to mongodb.com and create a free account
- Create a cluster
- Replace `MONGODB_URI` with your connection string

### Step 3: Start Backend Server

```bash
npm run dev
```

You should see: `Server running on http://localhost:5000`

### Step 4: Install Frontend Dependencies (new terminal)

```bash
cd frontend
npm install
```

### Step 5: Setup Frontend Environment

```bash
cp .env.example .env
```

Leave as default (API will proxy to localhost:5000)

### Step 6: Start Frontend Server

```bash
npm run dev
```

You should see: `VITE v... ready in ... ms`

Visit: **http://localhost:3000**

## 📁 Project Structure

```
website/
├── frontend/                  # React app (port 3000)
│   ├── src/
│   │   ├── pages/            # Home, About, Gallery, etc.
│   │   ├── components/       # Header, Footer
│   │   ├── services/         # API calls
│   │   └── styles/           # CSS
│   └── package.json
│
├── backend/                   # Express server (port 5000)
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── controllers/          # Business logic
│   └── package.json
│
└── README.md                 # Full documentation
```

## 🛠️ Available Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with auto-reload (requires nodemon)
- `npm start` - Start server

## 🔌 API Endpoints

All API endpoints are prefixed with `/api`

### Test the API
```bash
# Health check
curl http://localhost:5000/api/health

# Create appointment
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "date": "2024-12-15",
    "type": "wedding"
  }'

# Get all services
curl http://localhost:5000/api/services

# Get all gallery items
curl http://localhost:5000/api/gallery
```

## 📝 Pages Available

- **Home** `/` - Main landing page
- **About** `/about` - About the studio
- **Gallery** `/gallery` - Photo gallery with filters
- **Services** `/services` - Service offerings
- **Albums** `/albums` - Photo albums
- **Appointment** `/appointment` - Book appointment
- **Events** `/events` - Upcoming events
- **Contact** `/contact` - Contact form
- **Privacy** `/privacy` - Privacy policy
- **Terms** `/terms` - Terms of service

## 🎨 Design System

The site uses a luxury aesthetic with:
- **Color Scheme**: Dark background with gold accents
- **Fonts**: Cormorant Garamond (headings), Inter (body)
- **Spacing**: 24px base radius, consistent padding
- **Animations**: Smooth transitions and reveals

## 🗄️ Database

### Models
1. **Appointment** - Session bookings
2. **Contact** - Form submissions
3. **Gallery** - Photos with categories
4. **Service** - Services with pricing
5. **Event** - Upcoming events
6. **Album** - Photo collections

All models include timestamps (createdAt, updatedAt)

## 🔄 Frontend-Backend Flow

```
User Action (Browser)
        ↓
React Component
        ↓
API Service (Axios)
        ↓
Backend Express Route
        ↓
Controller (Business Logic)
        ↓
MongoDB Database
        ↓
Response back to Component
        ↓
Update UI
```

## 📦 Technologies

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Build | Vite (frontend), Node (backend) |
| HTTP | Axios (client), Express (server) |

## 🚨 Troubleshooting

### Backend won't connect to MongoDB
```bash
# Check MongoDB is running
# macOS: brew services start mongodb-community
# Or use MongoDB Atlas with connection string
```

### CORS errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled in `backend/server.js`

### Frontend shows blank page
- Check browser console for errors
- Verify backend API is responding: `http://localhost:5000/api/health`
- Clear cache and restart dev server

### Port already in use
```bash
# Find and kill process on port
# macOS/Linux
lsof -i :3000   # frontend
lsof -i :5000   # backend

# Kill the process
kill -9 <PID>
```

## 📚 Further Reading

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🌐 Deployment

When ready to deploy:
1. See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions
2. Options include: Vercel + Railway, Netlify + Heroku, or Docker

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] MongoDB connection configured
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can see gallery and services loading
- [ ] Can submit appointment form
- [ ] Can send contact message

## 🎯 Next Steps

1. ✅ You have a working React + Express + MongoDB stack
2. Add sample data to database
3. Customize styling and content
4. Connect payment system (optional)
5. Deploy to production

Need help? Check the README files or the code comments!
