# Deployment Guide for PB Photography

## Deploying the Full Stack Application

This guide covers deployment for both frontend and backend.

## Option 1: Vercel + Railway (Recommended)

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/pb-photography.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL`: Your backend API URL

3. **Vercel will provide your frontend URL**

### Backend Deployment (Railway)

1. **Create Railway Account** at https://railway.app

2. **Deploy Backend**
   - Connect your GitHub repository
   - Select the backend folder
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: 5000 (or any port)
     - `NODE_ENV`: production

3. **Update Frontend**
   - Update `VITE_API_URL` in Vercel to your Railway backend URL

## Option 2: Netlify + Heroku

### Frontend (Netlify)

1. **Build locally first**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy on Netlify**
   - Drag and drop the `frontend/dist` folder, OR
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Backend (Heroku)

1. **Install Heroku CLI**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

2. **Deploy**
   ```bash
   cd backend
   heroku login
   heroku create your-app-name
   heroku addons:create mongolab:sandbox
   git push heroku main
   ```

## Option 3: Docker Deployment

### Build Docker Image

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
EXPOSE 5000
CMD ["npm", "start"]
```

## Environment Variables Checklist

### Frontend
- [ ] `VITE_API_URL` - Pointing to backend API

### Backend
- [ ] `MONGODB_URI` - MongoDB Atlas or local connection
- [ ] `PORT` - Server port (default 5000)
- [ ] `NODE_ENV` - Set to "production"

## MongoDB Setup for Production

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Replace username and password in the URI

2. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/pb-photography?retryWrites=true&w=majority
   ```

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Gallery images load
- [ ] Appointment form submits successfully
- [ ] Contact form works
- [ ] No CORS errors in console
- [ ] SSL certificate working (https)
- [ ] Environment variables are set correctly

## Troubleshooting

### CORS Errors
- Ensure backend has correct CORS origin set
- Update `VITE_API_URL` in frontend

### Database Connection Issues
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

### API Calls Failing
- Check backend logs
- Verify API endpoint format
- Confirm environment variables are set

## Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Cache static assets
   - Lazy load images
   - Optimize bundle size

2. **Backend**
   - Enable caching headers
   - Use database indexing
   - Implement pagination for large queries

## Monitoring

- Set up error tracking (Sentry, Rollbar)
- Monitor API response times
- Track database performance
- Set up uptime monitoring
