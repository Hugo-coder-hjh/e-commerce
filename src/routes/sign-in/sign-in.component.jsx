import {
auth,
signInWithGooglePopup,
createUserDocumentFromAuth,
// signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';

import {useEffect} from 'react';
import { getRedirectResult } from 'firebase/auth';
import { async } from '@firebase/util';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';



const SignIn = () => {
//    useEffect(async () => {
//     const response = await getRedirectResult(auth);
//     console.log(response);
//    }, [])
    

    //when make call to database, it is an asynchronous operation
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}>Sign In with Google Popup</button>
          <SignUpForm />
          {/* <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */}
        </div>
    )
}

export default SignIn;