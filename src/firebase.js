import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCk574ybU6708hj__ziB3FwbeSGpQ7jSU",
  authDomain: "chrome-ranger-429012-a2.firebaseapp.com",
  projectId: "chrome-ranger-429012-a2",
  storageBucket: "chrome-ranger-429012-a2.appspot.com",
  messagingSenderId: "807521116344",
  appId: "1:807521116344:web:d85b75ecf55ac4741b944d",
  measurementId: "G-HY625WTQD7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const getAllGames = async () => {
  const gamesCol = collection(db, 'games'); // Adjust collection name if needed
  const gamesSnapshot = await getDocs(gamesCol);
  const gamesList = gamesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return gamesList;
};
