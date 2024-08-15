import React from 'react'
import Header from '../Components/Header/Index'
import SignUpSignInComponent from '../Components/SignUpSignIn/Index'

function SignUp() {
    return (
        <div>
            <Header />
            <div className='wrapper'>
                <SignUpSignInComponent />
            </div>
        </div>
    )
}

export default SignUp