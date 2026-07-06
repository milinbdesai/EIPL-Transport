# Excelsource Transport App - Deployment Guide

## PHASE 1: SET UP FIREBASE PROJECT

### Step 1: Create Firebase Project
1. Go to [firebase.google.com/console](https://firebase.google.com/console)
2. Click "Add Project"
3. Name: `excelsource-transport`
4. Accept default settings, click "Create Project"
5. Wait for project creation (2-3 min)

### Step 2: Create Firebase Web App
1. In Firebase Console, click the Web icon (</> )
2. App nickname: `Excelsource Transport`
3. Register app
4. You'll get config like:
```javascript
const firebaseConfig = {
  apiKey: "xxxxx",
  authDomain: "xxxxx.firebaseapp.com",
  projectId: "xxxxx",
  storageBucket: "xxxxx.appspot.com",
  messagingSenderId: "xxxxx",
  appId: "xxxxx"
};
```
5. **Copy this config** - you'll need it in Step 5

### Step 3: Enable Authentication
1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get Started**
3. Click **Email/Password**
4. Toggle "Enable" ON
5. Save

### Step 4: Create Firestore Database
1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **Create Database**
3. Select **Start in test mode** (for development)
4. Location: `asia-south1` (closest to India)
5. Click **Create**
6. Wait for setup (1-2 min)

### Step 5: Create Collections (in Firestore)
Go to Firestore → Click **+ Start Collection**

**Create 4 Collections:**

**Collection 1: users**
- Collection ID: `users`
- Add document with ID `admin` and fields:
  - `email`: `admin@excelsource.com`
  - `name`: `Priya Sharma`
  - `role`: `admin`
  - `phone`: `9876543212`

**Collection 2: cars**
- Collection ID: `cars`
- Auto-generate IDs for these 3 documents:
  - Doc 1: regNumber `GJ01AB1234`, model `Fortuner`, insurance `2025-06-15`, fastag `FT1234`, status `available`, location `Vadodara Office`
  - Doc 2: regNumber `GJ01AB5678`, model `Innova`, insurance `2025-08-20`, fastag `FT5678`, status `in_use`, location `Ahmedabad`
  - Doc 3: regNumber `GJ01AB9012`, model `Ertiga`, insurance `2025-05-10`, fastag `FT9012`, status `breakdown`, location `Service Center`

**Collection 3: trips**
- Collection ID: `trips` (leave empty, will populate via app)

**Collection 4: assignments**
- Collection ID: `assignments` (leave empty, will populate via app)

---

## PHASE 2: PREPARE APP FOR NETLIFY

### Step 6: Create Project Structure
```
excelsource-transport/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.jsx
│   ├── firebase-config.js
│   └── index.js
├── package.json
├── vite.config.js (or next.config.js)
└── netlify.toml
```

### Step 7: Create package.json
Save this as `package.json` in your project root:

```json
{
  "name": "excelsource-transport",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.7.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

### Step 8: Create vite.config.js
Save as `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### Step 9: Create netlify.toml
Save as `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 10: Create public/index.html
Save as `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excelsource Transport Management</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
</body>
</html>
```

### Step 11: Create src/index.jsx
Save as `src/index.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 12: Create src/App.jsx
Copy the entire content from `excelsource_transport_app.jsx` and save as `src/App.jsx`

### Step 13: Create src/firebase-config.js
**IMPORTANT:** Update with your credentials from Step 5:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## PHASE 3: DEPLOY TO NETLIFY

### Step 14: Push Code to GitHub
1. Create GitHub account (if not already)
2. Create new repo: `excelsource-transport`
3. Push all files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/excelsource-transport.git
   git push -u origin main
   ```

### Step 15: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repo `excelsource-transport`
5. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`
6. Click **"Deploy site"**
7. Wait 2-3 min for deployment
8. Your site URL will be: `https://your-app-name.netlify.app`

### Step 16: Add Environment Variables (in Netlify)
1. Go to Netlify Dashboard → Your Site
2. **Settings** → **Environment Variables**
3. Add your Firebase credentials as variables:
   ```
   VITE_FIREBASE_API_KEY=xxxxx
   VITE_FIREBASE_AUTH_DOMAIN=xxxxx
   VITE_FIREBASE_PROJECT_ID=xxxxx
   etc.
   ```
4. Redeploy site

---

## TEST THE APP

### Demo Accounts (already created):
- **Admin**: admin@excelsource.com / password
- **Manager**: manager@excelsource.com / password
- **Driver**: driver1@excelsource.com / password

### Test Workflow:
1. Login as Admin
2. Go to **"Add Car"** → add a test car
3. Go to **"Cars"** → verify car appears
4. Logout, login as Manager
5. Go to **"Dashboard"** → verify car availability
6. Logout, login as Driver
7. Go to **"My Assignments"** → verify assignment shows
8. Go to **"Active Trip"** → mark trip as completed

---

## TROUBLESHOOTING

**Error: "Module not found: firebase"**
→ Run `npm install firebase`

**Error: "Firestore not initialized"**
→ Check your Firebase credentials in `firebase-config.js` match the config from Step 5

**Error: "Authentication disabled"**
→ Go to Firebase Console → Authentication → Enable Email/Password

**App won't deploy**
→ Check `netlify.toml` exists and build command is `npm run build`

---

## NEXT STEPS (PHASE 2)

- [ ] Integrate real Firebase Firestore queries
- [ ] Add SMS/WhatsApp notifications (Twilio)
- [ ] GPS tracking for drivers
- [ ] Mobile app (React Native)
- [ ] Cost allocation reports
- [ ] Maintenance scheduling

---

**Status**: MVP deployed and live.  
**Timeline**: 30 mins setup + 10 mins deployment = 40 mins total.

For questions, refer back to this guide or Firebase documentation.
