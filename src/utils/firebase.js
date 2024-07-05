// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBbGiuHtaXqmJ6oikvwxPnhP491yTjg2KM',
  authDomain: 'ai-flix-startup.firebaseapp.com',
  projectId: 'ai-flix-startup',
  storageBucket: 'ai-flix-startup.appspot.com',
  messagingSenderId: '498351188294',
  appId: '1:498351188294:web:29c5cd63c285181272dd47',
  measurementId: 'G-NV9PP81S7C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
