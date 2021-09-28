import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import axios from "axios";
import {useRouter} from 'next/router';
import { Context } from "../../context";

import Link from "next/link";


const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    // state 
    const { state, dispatch } = useContext(Context);
    const {user} = state;
    const router = useRouter();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"));
    }, [history]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation 
        if(!email || !password) {
            toast.error('Email and password is required');
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result, "result");
            const { user } = result;

            if (result.user.emailVerified) {
                console.log("true");
                // window.localStorage.removeItem("emailForRegistration");
                // const registeringUser = auth.currentUser.email;
                // console.log("user", user, user.Aa, "token?", user.email, "email??");
                await auth.currentUser.updatePassword(password);
                const idTokenResult = await auth.currentUser.getIdTokenResult();
                const authtoken = idTokenResult.token;

                await axios.post(
                    `/api/register`,
                    { email }
                ).then(       
                    router.push("/auth/login")
                );


          

                    // dispatch({
                    //   type: "LOGIN",
                    //   payload: data,
                    // });

                // if(data) {
                //     const user = email;
                //     const { data } = await axios.post(
                //     "/api/login",
                //     { user },
                //         {
                //             headers: {
                //             authtoken,
                //             },
                //         }
                //     );
            
                //     dispatch({
                //       type: "LOGIN",
                //       payload: data,
                //     });
                // }

                // const { data } = await axios.post(
                //     "/api/login",
                //     { user },
                //         {
                //             headers: {
                //             authtoken,
                //             },
                //         }
                //     );
            
                //     dispatch({
                //       type: "LOGIN",
                //       payload: data,
                //     });
                // console.log(idTokenResult, "ttjsogifnhiudh rgwisu ");
                // createOrUpdateUser(idTokenResult.token)
                // dispatch({
                //     type: "LOGIN",
                //     payload: data,
                //   });
                // const authtoken = idTokenResult.token;
                // const { data } = await axios.post(
                //     "/api/login",
                //     { user },
                //         {
                //             headers: {
                //             authtoken,
                //             },
                //         }
                //     );

                //     dispatch({
                //     type: "LOGIN",
                //     payload: data,
                //     });
                //     firebase.auth().signOut();
                //     window.localStorage.setItem("user", JSON.stringify(data));
                //     console.log(data, "ddataddtatddadatta");
              
                    // router.push("/");
            }

            // router.push("/");

            // return new Promise((resolve, reject) => {
            //     auth.signInWithEmailLink(email, window.location.href)
            //     .then((result) => {
            //         console.log(result, "result??????");
            //         if(result.user.emailVerified) {
            //             // remove user email from local storage
            //             window.localStorage.removeItem("emailForRegistration");
            //             let user = auth.currentUser;
            //             resolve(user);
            //             console.log("true");
            //         }
            //     })
            // })
            // const user = await auth.signInWithEmailLink();
            // console.log(user);
            // const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log(result, "result")
            // console.log("Result", result)
            // if(result.user.emailVerified) {
            //     // remove user email from local storage
            //     window.localStorage.removeItem("emailForRegistration");
            //     // get user id token
            //     let user = auth.currentUser;
            //     await user.updatePassword(password);
            //     const idTokenResult = await user.getIdTokenResult();
            //     // redux store
            //     console.log("user", user, "idTokenResult", idTokenResult);
                
            //     createOrUpdateUser(idTokenResult.token)
            //     // .then((res) => {
            //     //     dispatch({
            //     //         type: "LOGGED_IN_SELLER",
            //     //         payload: {
            //     //             name: res.data.name,
            //     //             email: res.data.email,
            //     //             token: idTokenResult.token,
            //     //             role: res.data.role,
            //     //             _id: res.data._id,
            //     //         },
            //     //       });
            //     // })
            //     // .catch(err => console.log(err));
            //     // redirect
            //     // history.push('/');
            // }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <br/>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus />
        <br/>
        <button type="submit" className="btn btn-raised">Complete Registration </button>
    </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;