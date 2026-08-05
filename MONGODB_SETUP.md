# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud) - Recommended ⭐

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (select Free tier)
4. Click "Connect" and copy the connection string
5. Replace the username and password in the string
6. Update your `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pb-photography?retryWrites=true&w=majority
```

7. Restart the backend server

### Example Connection String:
```
mongodb+srv://user123:password@cluster0.mongodb.net/pb-photography?retryWrites=true&w=majority
```

---

## Option 2: MongoDB Community (Local) - Manual Install

### macOS:

```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB as a service
brew services start mongodb-community

# To stop MongoDB
brew services stop mongodb-community

# To view status
brew services list
```

### Linux (Ubuntu/Debian):

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -

# Add MongoDB repository
echo "deb https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable on startup
sudo systemctl enable mongod
```

### Windows:

1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. Follow the installation wizard
4. MongoDB will be installed as a service automatically

---

## Option 3: MongoDB with Docker 🐳

If you have Docker installed:

```bash
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run -d -p 27017:27017 --name pb-mongodb mongo

# View logs
docker logs pb-mongodb

# Stop container
docker stop pb-mongodb

# Start container again
docker start pb-mongodb
```

---

## Verify MongoDB is Running

```bash
# Test connection
mongosh mongodb://localhost:27017

# Or via curl for health check
curl http://localhost:27017

# You should see MongoDB welcome page or connection message
```

---

## Seeding Sample Data

Once MongoDB is running:

```bash
cd backend

# Seed the database with sample data
npm run seed
```

Output should show:
```
🌱 Seeding database...
✓ Connected to MongoDB
✓ Cleared existing data
✓ Added 4 services
✓ Added 4 gallery items
✓ Added 3 events
✓ Added 3 albums
✅ Database seeding completed successfully!
```

---

## Troubleshooting

### "Connection refused on port 27017"
- MongoDB is not running
- Use `brew services start mongodb-community` (macOS)
- Or check if your MongoDB Atlas connection string is correct

### "Authentication failed"
- Verify MongoDB Atlas credentials in connection string
- Check username and password are URL encoded if they contain special characters
- Example: password "p@ssw0rd" should be "p%40ssw0rd"

### "Cannot find module mongoose"
- Run `npm install` in the backend directory
- Verify `mongoose` is in package.json

### Database queries still timing out
- Increase `serverSelectionTimeoutMS` in backend/server.js
- Check firewall settings if using MongoDB Atlas
- Add your IP to MongoDB Atlas IP whitelist

---

## Quick Start Commands

```bash
# Terminal 1: Start MongoDB (local)
brew services start mongodb-community

# Terminal 2: Seed database
cd backend
npm run seed

# Terminal 3: Start backend
npm run dev

# Terminal 4: Start frontend
cd frontend
npm run dev

# Visit http://localhost:3000
```

---

## Next Steps

1. ✓ Setup MongoDB (Atlas or Local)
2. ✓ Seed sample data: `npm run seed`
3. ✓ Backend should now work
4. ✓ Frontend API calls will succeed
5. View gallery, services, and events at http://localhost:3000
