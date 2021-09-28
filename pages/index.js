import React from "react";
import { BackTop, Button } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';
import Cover from '../components/cards/Cover';
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Image from 'next/image'
import { ConsoleSqlOutlined } from "@ant-design/icons";
// import museumpic from '../public/coverphoto.jpg'

const Index = ({ courses, covers }) => {
  // const [courses, setCourses] = useState([]);

  
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
    
  //   fetchCourses();
  // }, []);

    return (
      <>
      <div style={{position: 'absolute', width: '100%'}}>
        <TopNav  />
        <div className="cover" style={{ padding: 0, position: 'relative', textAlign: 'center'}}>
          <h1 className="text-center" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '25%', fontSize: '100px', color: 'blanchedalmond', zIndex: 2, fontFamily: 'serif' }}>
            Art Masters Academy
            {/* <img src={require('../../public/coverphoto.jpg')} /> */}

          </h1>
          <p style={{ zIndex: 2, fontSize: '35px', color: 'aliceblue', textAlign: 'center', position: 'absolute', left: 0, right: 0, top: '60%', fontFamily: 'serif', fontWeight: 'bold'}}>mastering art is an art</p>

          <Cover style={{ zIndex: 1 }} />
        </div>
        <br/><br/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1 style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'brown' }}>
                Our Courses
              </h1>
            </div>
          </div>
        </div>
        <br/><br/>

        <div className="container-fluid">
            <div className="row">
                {courses.map((course) => (
                  <div key={course._id} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <CourseCard course={course}/>
                  </div>))}
            </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <Button style={{ fontFamily: 'serif', fontSize: '20px'}} href="/courses">Explore courses</Button>
            </div>
          </div>
        </div>
                  <br/><br/><br/>
        <BackTop />
        
        <Footer />
      </div>

       
      </>
    );
  };

  export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`);
    // const { cover } = await axios.get(`${process.env.API}/courses`)
    // const data = [courses, cover]
    // const cover = JSON.stringify(coverdata)
    // console.log("DATA LENGTH =====> ", data.length);
    return {
      props: {
        courses: data,
      },
      // props: {
      //   cover: cover,
      // }
    };
  }

  // export async function getServerSideProperties() {
  //   // const { data } = await axios.get(`${process.env.API}/courses`);
  //   const { data } = await axios.get(`${process.env.API}/get-covercontent`)
  //   // const data = [courses, cover]
  //   // const cover = JSON.stringify(coverdata)
  //   // console.log("DATA LENGTH =====> ", data.length);
  //   return {
  //     props: {
  //       covers: data,
  //     },
  //     // props: {
  //     //   cover: cover,
  //     // }
  //   };
  // }
  

  // export async function getServerSideProps() {
  //   const [{courseResponse}, {coverResponse}] = await Promise.all([
  //     axios.get(`${process.env.API}/courses`), 
  //     axios.get(``)
  //   ]);
  //   // const [courses, cover] = await Promise.all([
  //   //   courseResponse, 
  //   //   coverResponse
  //   // ]);
  //   return { props: { courses: courseResponse, cover: coverResponse } };
  // }
  
  export default Index;