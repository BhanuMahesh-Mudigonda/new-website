# PB Photography - React Frontend

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL if different from default

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

Output files will be in the `dist` directory.

### Project Structure

```
src/
├── components/        # Reusable components (Header, Footer, etc.)
├── pages/            # Page components (Home, About, Gallery, etc.)
├── services/         # API service calls
├── hooks/            # Custom React hooks
├── styles/           # Global CSS
├── App.jsx          # Main app component with routing
└── index.jsx        # Entry point
```

### Key Features

- **React 18** - Latest React version
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **Responsive Design** - Mobile-first approach
- **Luxury Aesthetic** - Premium styling and animations

### API Endpoints

The frontend communicates with the backend at:
- Development: `http://localhost:5000/api`

### Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000/api)
