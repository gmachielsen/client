import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';
import Cover from '../components/cards/Cover';
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Image from 'next/image'
import { DownSquareOutlined } from "@ant-design/icons";
import { Menu, Checkbox } from "antd";

// import museumpic from '../public/coverphoto.jpg'
const { SubMenu, ItemGroup } = Menu;

const Courses = ({ propcourses }) => {
const [categories, setCategories] = useState([]);  
const [courses, setCourses] = useState([]);
const [ok, setOk] = useState(false);
const [categoryIds, setCategoryIds] = useState([]);
const [courseImage, setCourseImage] = useState({})

useEffect(() => {
  loadCourses();
  loadCategories();
}, []);

useEffect(() => {
  // console.log("ok to request", price);
  // fetchCourses({ categoryIds });
}, [ok]);

const loadCourses = async () => {
  // const { data } = await axios.get("/api/courses");
  // setCourses(data);
  setCourses(propcourses);

};

const loadCategories = async () => {
  await axios.get("/api/admin/categories")
 .then((c) => setCategories(c.data));
}

const fetchCourses = async (arg) => {
  console.log(arg, "<<------ arguments");
  setCourses([]);
  await axios.post("api/search/courses", arg)
  .then((res) => {
    setCourses(res.data);
    console.log(res.data, "resdatadada");
  });
  console.log(courses, "courses")
  console.log(courses.name, "course imagegememgegmge");
  // console.log(courses.data.image.Location, "course image location,,,,,,");
};

const showCategories = () =>
  categories.map((c) => (
    <div key={c._id}>
      <Checkbox
        onChange={handleCheck}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>
      <br />
    </div>
  ));

  const handleCheck = (e) => {

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // setCategoryIds(categoryIds);

    // console.log(inTheState, "is piethe, daar");
    // fetchProducts({ category: inTheState, shipping, price });
    fetchCourses({ categoryIds: inTheState });

  };
    return (
      <>
      <div style={{position: 'absolute', width: '100%'}}>

        <div className="container-fluid" style={{ padding: "0"}}>
            <div className="row" style={{ padding: "15px" }}>
                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-3 pt-2">
                  <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                  <SubMenu
                      key="3"
                      title={
                        <span className="h6">
                          <DownSquareOutlined /> Categories
                        </span>
                      }
                  >
                  <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

                  </Menu>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9 pt-2">
                    {courses.map((course) => (
                    <div key={course._id} className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
                      <CourseCard course={course}/>
                    </div>))}
                </div>
            </div>
        </div>
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
        propcourses: data,
      },
      // props: {
      //   cover: cover,
      // }
    };
  }

 
  
  export default Courses;