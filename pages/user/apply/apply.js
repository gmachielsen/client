import React, {useState, useEffect, useContext} from "react";
import { toast } from "react-toastify";
import {useRouter} from 'next/router';
import axios from "axios";
// import { Context } from "../../../../../context";

const ApplyForInstructor = () => {
    const [values, setValues] = useState({
        phone: "",
        website: ""      
    });
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [website, setWebsite] = useState("");
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");

    const router = useRouter();
    // state
    // const { state, dispatch } = useContext(Context);
    // const {user} = state;

    // useEffect(() => {
    //     if(user !== null) {
    //         router.push("/");
    //     }
    // }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
              "/api/application",
              values
            );
            // console.log(data)
            setValues({ ...values, phone: "", website: "" });
            toast("Thanks for your application for instructor, your application has been sended, we will contact you soon");
          } catch (err) {
            console.log(err);
            toast("application failed");
          }
    };

    const applyForm = () => (
        <form onSubmit={handleSubmit}>
            {/* <input type="email" className="form-control" value={email} placeholder="Your email" onChange={(e) => setValues({ ...values, title: e.target.value })} autoFocus/> */}
            <input type="text" className="form-control" value={values.phone} placeholder="Your phone" onChange={(e) => setValues({ ...values, phone: e.target.value })} autoFocus />
            <input type="text" className="form-control" value={values.website} placeholder="Your website" onChange={(e) => setValues({ ...values, website: e.target.value })} autoFocus />
            <br/>
            <button type="submit" className="btn btn-raised">Apply </button>
        </form>
        );
    
        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Apply</h4>
                        <h8>extra contact details</h8>
                        {applyForm()}
                    </div>
                </div>
            </div>
        );
    };
    

export default ApplyForInstructor;