import { useState} from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FornInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields
    const dispatch = useDispatch()

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !==confirmPassword){
            alert("passwords do not match");
            return;
        }
        try{
            dispatch(signUpStart(email,password,displayName))
            resetFormFields()
        }catch(error){
            console.error(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
    return(
        <div className='sign-up-container'>
            <h2> Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FornInput label="Display Name"   type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FornInput label="Email"   type="email" required onChange={handleChange} name="email" value={email} />
                <FornInput label="Password" required onChange={handleChange} name="password" value={password} />
                <FornInput label="Confirm Password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm