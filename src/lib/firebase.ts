import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcJ5M6dVdZPp3ug3phIKzRVcWv1xE5lk0",
  authDomain: "sathya-studio-gallery.firebaseapp.com",
  projectId: "sathya-studio-gallery",
  storageBucket: "sathya-studio-gallery.firebasestorage.app",
  messagingSenderId: "373714801948",
  appId: "1:373714801948:web:59b27625e635df9ff296d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
