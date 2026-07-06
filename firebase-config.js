// Firebase Configuration for Excelsource Transport App
// Replace with your actual Firebase project credentials from Firebase Console

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firestore Collections Schema (create these in Firebase Console):
/*
COLLECTIONS:
1. users
   - uid (string)
   - email (string)
   - name (string)
   - role (admin/management/driver/employee)
   - phone (string)
   - createdAt (timestamp)

2. cars
   - id (string)
   - regNumber (string)
   - model (string)
   - insurance (date)
   - fastag (string)
   - status (available/in_use/breakdown)
   - location (string)
   - createdAt (timestamp)

3. trips
   - id (string)
   - carId (string) -> reference to cars
   - driverId (string) -> reference to users
   - employeeId (string) -> reference to users
   - from (string)
   - to (string)
   - status (pending/in_progress/completed)
   - startTime (timestamp)
   - endTime (timestamp)
   - date (date)
   - createdAt (timestamp)

4. assignments
   - id (string)
   - tripId (string) -> reference to trips
   - carId (string) -> reference to cars
   - driverId (string) -> reference to users
   - status (assigned/accepted/started/completed)
   - assignedAt (timestamp)
*/
