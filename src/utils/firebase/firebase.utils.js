import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect (auth, googleProvider);



  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc (userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      }catch (error) {
        console.log ("error creating the user", error.message);
      }

    }

    // if userAuth exists, keep showing the updated userDocRef
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }