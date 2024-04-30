// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
        signInWithEmailAndPassword } from "firebase/auth";


import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4mEW4KYgS26L8hsXf5mYz1dTQwmPXfrQ",
  authDomain: "crwn-clothing-db-c4465.firebaseapp.com",
  projectId: "crwn-clothing-db-c4465",
  storageBucket: "crwn-clothing-db-c4465.appspot.com",
  messagingSenderId: "422055855568",
  appId: "1:422055855568:web:1ae0e7a4666fe3542465d5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});  

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if(!userAuth) return 
    const userDocRef = doc( db, 'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating the user', error.message);
            
        }
    }

    return userDocRef

    //if user data exists

}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}