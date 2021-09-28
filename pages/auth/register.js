import React, {useState, useEffect, useContext} from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {useRouter} from 'next/router';
import { Context } from "../../context";

const Register = () => {
    const [email, setEmail] = useState("");
    console.log("TESTING ENV", process.env.NEXT_APP_REGISTER_REDIRECT_URL);
    console.log("jeee",`${process.env.REACT_APP_API}/create-or-update-user`);

    const router = useRouter();
    // state
    const { state, dispatch } = useContext(Context);
    const {user} = state;

    useEffect(() => {
        if(user !== null) {
            router.push("/");
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            // url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            url: "http://localhost:3000/auth/register-complete",
            handleCodeInApp: true
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `Email is sent to ${email}/ Click the link to complete your registration.`
        );
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} placeholder="Your email" onChange={(e) => setEmail(e.target.value)} autoFocus/>
            <br/>
            <button type="submit" className="btn btn-raised" style={{ backgroundColor: 'antiquewhite' }}>Register</button>
        </form>
        );
    
        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4 className="text-center" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '40px'}}>Register</h4>
                        <br/><br/>
                        {registerForm()}
                    </div>
                </div>
            </div>
        );
    };
    

export default Register;