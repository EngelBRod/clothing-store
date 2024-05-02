import { useContext, useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FornInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPES_CLASSES } from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email,password)
            resetFormFields(); 
        }catch(error){
            if(error.code === "auth/invalid-credential"){
                alert('Invalid Credential')
            }
            console.error(error);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
    return(
        <div className='sign-up-container'>
            <h2> Already have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FornInput label="Email"   type="email" required onChange={handleChange} name="email" value={email} />
                <FornInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button type="submit">Sign IN</Button>
                    <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google Sign IN</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm