import React from "react";
import Footer from "../components/Footer";

const About = ({ courses }) => {
//   const [courses, setCourses] = useState([]);

  
//   useEffect(() => {
//     const fetchCourses = async () => {
//       const { data } = await axios.get("/api/courses");
//       setCourses(data);
//     };
    
//     fetchCourses();
//   }, []);

    return (
      <>
      {/* <div className="container-fluid" style={{position: 'absolute', width: '100%'}}> */}
        <div className="row text-center">
          <div className="col-12">
          <h1>About us</h1>
          <h1>About us</h1>
          <h1>About us</h1>
          <h1>About us</h1>
          <h1>About us</h1>
          <h1>About us</h1>

          </div>
        </div>
        <Footer />

      {/* </div> */}

       
      </>
    );
  };

  

 
  
  export default About;