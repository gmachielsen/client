import React, { useState, useEffect, useContext } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import {useRouter} from 'next/router';
import { Context } from "../../context";
import axios from "axios";
import Link from "next/link";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Bartje83!");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const {user} = state;

  console.log("STATE", state);
  
  
  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {router.push("/")};
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [user]);

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
    //   console.log(result, "result result");

      const { user } = result;
      console.log(user)
    //   console.log(user.email, "user email?");
      const idTokenResult = await user.getIdTokenResult();
      const authtoken = idTokenResult.token;
      const { data } = await axios.post(
        "/api/login",
        { user },
            {
                headers: {
                authtoken,
                },
            }
        );

        dispatch({
          type: "LOGIN",
          payload: data,
        });

    // save in local storage
    window.localStorage.removeItem("emailForRegistration");
    window.localStorage.setItem("user", JSON.stringify(data));
      console.log(data, "ddataddtatddadatta");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        const authtoken = idTokenResult.token;
        const { data } = await axios.post(
          "/api/login",
          { user },
              {
                  headers: {
                  authtoken,
                  },
              }
          );
  
          dispatch({
            type: "LOGIN",
            payload: data,
          });
  
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
        console.log(data, "ddataddtatddadatta");
  
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };


  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>
    <br/>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-center" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '40px'}}>Login</h4>
          )}
          <br/><br/>
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link href="/auth/forgot-password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;