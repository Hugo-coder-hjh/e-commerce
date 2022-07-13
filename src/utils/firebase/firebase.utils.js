import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGB1Ii3N_mfNmKxdXsXjvBZ4XZOqBFTTQ",
    authDomain: "crwn-clothing-db-7deef.firebaseapp.com",
    projectId: "crwn-clothing-db-7deef",
    storageBucket: "crwn-clothing-db-7deef.appspot.com",
    messagingSenderId: "533618120708",
    appId: "1:533618120708:web:33c054e3b73ceba1b13d51"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc (userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch (error) {
        console.log ("error creating the user", error.message);
      }

    }

    // if userAuth exists, keep showing the updated userDocRef
    return userDocRef;
  }