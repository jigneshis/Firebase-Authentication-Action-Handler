import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config object
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAWkIpW2hmLzsdoLza3BgRw5ckWwTyQ2Mk",
  authDomain: "turri-72fcd.firebaseapp.com",
  projectId: "turri-72fcd",
  storageBucket: "turri-72fcd.firebasestorage.app",
  messagingSenderId: "167118031575",
  appId: "1:167118031575:web:d5e131c2816e00a984fe92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;