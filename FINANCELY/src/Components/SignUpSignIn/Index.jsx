import React, { useState } from 'react';
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../FireBase"; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from '../Loader/Index';

function SignUpSignInComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(false);
    const navigate = useNavigate();

    async function createDoc(user) {
        setLoading(true);
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(userRef, {
                    name: name,
                    email: user.email,
                    photoURL: user.photoURL || "",
                    createdAt: new Date(),
                });
                toast.success("User profile created!");
            } catch (error) {
                toast.error("Error creating user profile: " + error.message);
            }
        } else {
            toast.warn("User profile already exists!");
        }
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        if (name !== "" && email !== "" && pass !== "" && confirmPass !== "") {
            if (pass === confirmPass) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                    const user = userCredential.user;
                    console.log(user);
                    await createDoc(user); // Create the document in Firestore
                    toast.success("User Created!");
                    setConfirmPass("");
                    setEmail("");
                    setPass("");
                    setName("");
                    navigate("/dashboard");
                } catch (error) {
                    toast.error("Error creating user: " + error.message);
                }
            } else {
                toast.error("Password and Confirm Password don't match");
            }
        } else {
            toast.error("All fields are mandatory!!");
        }
        setLoading(false);
    }

    async function loginWithEmail() {
        setLoading(true);
        if (email !== "" && pass !== "") {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;
                console.log(user);
                toast.success("User Logged In Successfully!!");
                navigate("/dashboard");
            } catch (error) {
                toast.error("Error logging in: " + error.message);
            }
        } else {
            toast.error("All fields are mandatory!!");
        }
        setLoading(false);
    }

    async function googleAuth() {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log(user);
            await createDoc(user);
            toast.success("User Signed In Successfully!!");
            navigate("/dashboard");
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error("Error: " + errorMessage);
        }
        setLoading(false);
    }


    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <>
            {loginForm ? (
                <div className='signup-wrapper'>
                    <h2 className='title'>
                        Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
                    </h2>
                    <form onSubmit={submitHandler}>
                        <Input label={"email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} type={'email'} />
                        <Input label={"password"} state={pass} setState={setPass} placeholder={"Example@123"} type={'password'} />
                        <Button
                            disabled={loading}
                            text={loading ? "Loading" : "Login Using Email and Password"}
                            onClick={loginWithEmail}
                        />

                        <p style={{ textAlign: "center", margin: 0 }}>or</p>

                        <Button text={"Login Using Google"} blue={true} onClick={googleAuth} />

                        <p className='p-login'
                            style={{ cursor: "pointer" }}
                            onClick={() => setLoginForm(!loginForm)}>
                            Or Don't Have An Account? Click Here
                        </p>
                    </form>
                </div>
            ) : (
                <div className='signup-wrapper'>
                    <h2 className='title'>
                        Sign up on <span style={{ color: "var(--theme)" }}>Financely.</span>
                    </h2>
                    <form onSubmit={submitHandler}>
                        <Input label={"full Name"} state={name} setState={setName} placeholder={"John Doe"} type={'text'} />
                        <Input label={"email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} type={'email'} />
                        <Input label={"password"} state={pass} setState={setPass} placeholder={"Example@123"} type={'password'} />
                        <Input label={"confirm password"} state={confirmPass} setState={setConfirmPass} placeholder={"Example@123"} type={'password'} />
                        <Button
                            disabled={loading}
                            text={loading ? <Loader/> : "Signup Using Email and Password"}
                            onClick={signUpWithEmail}
                        />
                        <p className='p-login'>or</p>
                        <Button text={"Signup Using Google"} blue={true} onClick={googleAuth} />
                        <p className='p-login'
                            style={{ cursor: "pointer" }}
                            onClick={() => setLoginForm(!loginForm)} >
                            Or Have An Account Already? Click Here
                        </p>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignUpSignInComponent;
