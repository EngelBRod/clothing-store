import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FornInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields

    console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
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
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign IN</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm