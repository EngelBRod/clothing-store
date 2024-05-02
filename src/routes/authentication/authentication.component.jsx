
import {useEffect} from 'react'
import  {  getRedirectResult} from 'firebase/auth'

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication = () => {

    useEffect(()=>{
        async function redirectResult(){
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        redirectResult()
    },[])

    const loGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    const logGoogleRedirectUser = async () =>{
        const {user} = await signInWithGoogleRedirect();
 
    }




    return(
        <div className='authentication-container'>
            <h1>Sign In Page</h1>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;