# 🎯 Fix MongoDB & Get App Running

## Current Status

✅ **Frontend**: Working perfectly at http://localhost:3000
✅ **Backend**: Working perfectly at http://localhost:5000
❌ **Database**: MongoDB not connected (needs setup)

## The Issue

API calls return **500 errors** because MongoDB isn't running. Once you connect MongoDB, everything will work!

---

## 🚀 Quick Fix (Choose ONE option)

### Option 1: MongoDB Atlas (Cloud) ⭐ EASIEST

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up with Google or email
3. Create a free cluster (takes 1-2 minutes)
4. Click "Connect" and copy your connection string
5. Update `backend/.env`:

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster0.mongodb.net/pb-photography?retryWrites=true&w=majority
```

6. Restart backend server (Ctrl+C, then `npm run dev`)

**Done!** That's it. No installation needed.

---

### Option 2: Local MongoDB (macOS)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start it
brew services start mongodb-community

# Seed data
cd backend
npm run seed
```

---

### Option 3: Docker (Easiest if you have Docker)

```bash
docker run -d -p 27017:27017 mongo

# Then seed data
cd backend
npm run seed
```

---

## ✅ Verify It's Working

```bash
# Test MongoDB connection
curl http://localhost:27017

# Test API
curl http://localhost:5000/api/health
```

Should show connection status without errors.

---

## 📋 Complete Setup Guide

### If Starting Fresh:

```bash
# Terminal 1: Start Backend
cd /Users/apple/Desktop/Bhanu/website/backend
npm run dev

# Terminal 2: Start Frontend  
cd /Users/apple/Desktop/Bhanu/website/frontend
npm run dev

# Terminal 3: Setup MongoDB (pick one of the options above)
# Then run this:
cd /Users/apple/Desktop/Bhanu/website/backend
npm run seed
```

### What to Expect After Setup:

✅ Backend will show: `✓ MongoDB connected successfully`
✅ Frontend will load gallery images
✅ Forms will work and submit successfully
✅ All API calls will return data
✅ No 500 errors in console

---

## 🧪 Test Each Page

After setup, visit these and they should all work:

- http://localhost:3000 (Home - loads gallery)
- http://localhost:3000/gallery (Shows images)
- http://localhost:3000/services (Shows prices)
- http://localhost:3000/appointment (Form works)
- http://localhost:3000/contact (Form works)
- http://localhost:3000/events (Shows events)
- http://localhost:3000/albums (Shows albums)

---

## 🛠️ Troubleshooting

### "MongoDB connection refused"
→ MongoDB isn't running. Use one of the three options above.

### "Still getting 500 errors"
→ MongoDB is running but backend didn't restart. 
   - Kill backend (Ctrl+C)
   - Run `npm run dev` again

### "Seeding failed"
→ Make sure MongoDB is actually running first:
```bash
# Check if running
ps aux | grep mongod
```

### "Port 5000/3000 already in use"
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

---

## 📚 Documentation Files

All in `/Users/apple/Desktop/Bhanu/website/`:

- **STATUS_REPORT.md** - Current status & what's fixed
- **MONGODB_SETUP.md** - Detailed MongoDB setup guide
- **GETTING_STARTED.md** - Complete setup instructions
- **DEPLOYMENT.md** - How to deploy to production
- **README.md** - Full project overview
- **setup.sh** - Automated setup script (optional)

---

## 🎯 Next Steps

1. ✅ Choose MongoDB option (Atlas recommended)
2. ✅ Update `backend/.env` with connection string
3. ✅ Restart backend
4. ✅ Run `npm run seed` (for sample data)
5. ✅ Visit http://localhost:3000
6. ✅ Test the forms and pages

---

## 💡 Pro Tip

If using MongoDB Atlas:
- Free forever tier
- No credit card needed initially  
- Globally distributed
- Perfect for development and production

---

## ❓ Questions?

Check these files for detailed answers:
- `MONGODB_SETUP.md` - MongoDB questions
- `GETTING_STARTED.md` - General setup questions
- `backend/README.md` - Backend questions
- `frontend/README.md` - Frontend questions

---

**Everything is ready to go. Just add MongoDB! 🚀**
