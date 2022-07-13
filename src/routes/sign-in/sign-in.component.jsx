import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    //when make call to database, it is an asynchronous operation
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }


    return (
        <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </div>
    )
}

export default SignIn;