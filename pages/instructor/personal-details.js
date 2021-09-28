import { useState, useEffect, useContext } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Button } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import { toast } from "react-toastify";

const PersonalDetails = () => {
  // const [instructor, setInstructor] = useState({});
  // console.log(instructor, "instructor");
  // useEffect(() => {
  //   loadInstructor();
  // }, []);

  // const loadInstructor = async () => {
  //   const { data } = await axios.get("/api/instructor-details");
  //   setInstructor(data);
  // };

  useEffect(() => {
    // const { state, dispatch } = useContext(Context);
    // const { user } = state;
    }, []);
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [values, setValues] = useState({
    name: "",
    phone: "",
    surname: "",
    artistname: "",
  });
  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(values);
        const {data} = await axios.post('/api/update-instructor-details', {
            ...values
        });
        toast("Personal details updated");
    } catch (err) {
        toast(err.response.data);
    }

  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Personal Details</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
      <label>email</label>
          <input 
              type="text"
              className="form-control square"
              placeholder={user.email}
              autoFocus
              readOnly
          />
      <form onSubmit={handleSubmit}>

          <label>name</label>
          <input 
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              values={values.name}
              placeholder={user.name}
              autoFocus
              required
          />
          <label>surname</label>
          <input 
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, surname: e.target.value })}
              values={values.surname}
              placeholder={user.surname}
              autoFocus
              required
          />
          <label>artist name</label>
          <input 
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, artistname: e.target.value })}
              values={values.artistname}
              placeholder={user.artistname}
              autoFocus
              required
          />
          <label>phone</label>
          <input 
              type="text"
              className="form-control square"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              values={values.phone}
              placeholder={user.phone}
              autoFocus
              required
          />
          <Button onClick={handleSubmit} className="col mt-3" size="large" type="primary" shape="round">Save</Button>

      </form>
      {/* <h1>{ user.phone }</h1> */}
  
    </InstructorRoute>
  );
};

export default PersonalDetails;