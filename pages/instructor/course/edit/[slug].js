import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseEditForm from "../forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {List, Avatar, Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../forms/UpdateLessonForm";

const { Item } = List;

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    subcategories: [],
    loading: false,
    lessons: [],
  });
  const [image, setImage] = useState({});
  // const [lessonImage, setLessonImage] = useState({});
  const [preview, setPreview] = useState("");
  const [imageLessonPreview, setImageLessonPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [uploadImageButtonText, setuploadImageButtonText] = useState("Upload lesson image");
  // state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  // const [secondCurrent, setSecondCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
    "Upload Video"
  );
  // const [uploadLessonImageButtonText, setUploadLessonImageButtonText] = useState("Upload image");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");


  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
    loadCategories();
  }, [slug]);

  const loadCategories = async () => {
    await axios.get("/api/admin/categories")
    .then((c) => setCategories(c.data));
   }

   const getCategorySubcategories = async (id) => {
    await axios.get(`/api/category/subcategories/${id}`).then((data) => {
      setSubOptions(data.data);
      console.log(data.data, "datadadsada", subOptions);
      console.log(subOptions, "suboptions")
    });
    // console.log(iets, "iets")
  }

  const loadCourse = async () => {
     await axios.get(`/api/course/${slug}`)
    .then((p) => {
      setValues({ ...values, ...p.data });
      // console.log({...p.data.category}),



    }
    
      // console.log(values.name, "values", values.category, "categiry",p.data, "pdatada")
      // console.log(p.data.category, "category");
      // getCategorySubcategories(values.category)

      // let arr = [];
      // p.data.subcategories.map((s) => {
      //   arr.push(s._id);
      // });
      // console.log("ARR", arr);
      // setArrayOfSubs((prev) => arr); // required for ant design select to work
    
    )

    // const id = values.category;
    // await getCategorySubcategories(values.category);

    // let arr = [];
    // values.subcategories.map((s) => {
    //   arr.push(s._id);
    // })
    // console.log(values.category, "categro")

    // if (data) setValues(data);
    // if (data && data.image) setImage(data.image);
  };



  // const loadProduct = () => {
  //   getProduct(slug).then((p) => {
  //     // console.log("single product", p);
  //     // 1 load single proudct
  //     setValues({ ...values, ...p.data });
  //     // 2 load single product category subs
  //     getCategorySubs(p.data.category._id).then((res) => {
  //       setSubOptions(res.data); // on first load, show default subs
  //     });
  //     // 3 prepare array of sub ids to show as default sub values in antd Select
  //     let arr = [];
  //     p.data.subs.map((s) => {
  //       arr.push(s._id);
  //     });
  //     console.log("ARR", arr);
  //     setArrayOfSubs((prev) => arr); // required for ant design select to work
  //   });
  // };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleLessonImage = (e) => {
    let file = e.target.files[0];
    setImageLessonPreview(window.URL.createObjectURL(file));
    setuploadImageButtonText(file.name);
    setValues({ ...values, loading: true });
    setVisible(true)

    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-lessonpicture", {
          lessonimage: uri,
        });
        console.log("Image Lesson Uploaded", data);
        // set lesson image in te state 
        // setLessonImage(data);

        setCurrent({ ...current, lessonimage: data });
        // lessonpicture: data 
      } catch (err) {
        console.log(err);
        setCurrent({ ...current, lessonimage: data });
        toast("LessonImage upload failed, Try later.");
      }
    });
  };


  const handleCategoryChange = (e) => {
    e.preventDefault()
    console.log('CLICKED CATEGORY', e.target.value);
    setValues({ ...values, subcategories: [], category: e.target.value });
    axios.get(`/api/category/subcategories/${e.target.value}`)
      .then((res) => {
        setSubOptions(res.data);
      });
    setShowSubCategories(true);
};

  // const handleLessonImage = (e) => {
  //   let file = e.target.files[0];
  //   setImageLessonPreview(window.URL.createObjectURL(file));
  //   setUploadVideoButtonText(file.name);
  //   setValues({ ...values, loading: true });
  //   // resize
  //   Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
  //     try {
  //       let { data } = await axios.post("/api/course/lesson/upload-image", {
  //         image: uri,
  //       });
  //       console.log("Image Lesson Uploaded", data);
  //       // set lesson image in te state 
  //       setLessonImage(data);
  //       setValues({ ...values, loading: false });
  //     } catch (err) {
  //       console.log(err);
  //       setValues({ ...values, loading: false });
  //       toast("LessonImage upload failed, Try later.");
  //     }
  //   });
  // };



  
  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image remove failed. Try later.");
    }
  };


  const handleLessonImageRemove = async () => {
    try {
      const res = await axios.post("/api/course/lessonremove-image",  current.lessonimage);
      console.log(res, "lessonimage data");
      setuploadImageButtonText("Upload Image");
      setImageLessonPreview({});
      setCurrent({ ...current, lessonimage: {} });
      setVisible(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Lesson Image removed failed. Try later.");
    }
  }

  // const handleLessonImageRemove = async () => {
  //   try {
  //     // console.log(values);
  //     setValues({ ...values, loading: true });
  //     const res = await axios.post("/api/course/lesson/remove-image", { lessonImage });
  //     setLessonImage({});
  //     setLessonPreview("");
  //     setUploadLessonImageButtonText("Upload Image");
  //     setValues({ ...values, loading: false });
  //   } catch (err) {
  //     console.log(err);
  //     setValues({ ...values, loading: false });
  //     toast("Lesson Image removed failed. Try later.");
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      values.subs = arrayOfSubs;
      values.category = selectedCategory ? selectedCategory : values.category;
    // values.subcategories = arrayOfSubs;
    // values.category = selectedCategory ? selectedCategory : values.category;
      // console.log(values);
      const { data } = await axios.put(`/api/course/update/${slug}`, {
        ...values,
        image,
      });
      toast("Course updated!");
      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, lessons: [...allLessons] });
    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    // console.log("LESSONS REARRANGED RES => ", data);
    toast("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setValues({ ...values, lessons: allLessons });
    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  /**
   * lesson update functions
   */

  const handleVideo = async (e) => {
    // remove privious video
    if(current.video && current.video.Location) {
      const res = await axios.post(`/api/course/video-remove/${values.instructor._id}`, 
      current.video
      );
      console.log("REMOVED ====>", res);
    }
    // upload
    const file = e.target.files[0]
    setUploadVideoButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData()
    videoData.append('video', file);
    videoData.append('courseId', values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) => 
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  

  const handleUpdateLesson = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video")
    setVisible(false)
    // update ui 
    if(data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr, loading: false });
      toast('Lesson updated');
    }
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Update Course</h1>
      {/* {JSON.stringify(values)} */}
      <div className="pt-3 pb-3">
        <CourseEditForm
          handleSubmit={handleSubmit}
          handleImageRemove={handleImageRemove}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
          
          handleCategoryChange={handleCategoryChange}

          categories={categories}
          showSubCategories={showSubCategories}
          subOptions={subOptions}

          arrayOfSubs={arrayOfSubs}
          setArrayOfSubs={setArrayOfSubs}
          selectedCategory={selectedCategory}

        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}

      <hr />

      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>

                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger float-right"
                />
              </Item>
            )}
          ></List>
        </div>
      </div>

      <Modal
        title="Update lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          handleLessonImage={handleLessonImage}
          uploadImageButtonText={uploadImageButtonText}
          handleLessonImageRemove={handleLessonImageRemove}
          imageLessonPreview={imageLessonPreview}
          progress={progress}
          uploading={uploading}
          visible={visible}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    </InstructorRoute>
  );
};

export default CourseEdit;