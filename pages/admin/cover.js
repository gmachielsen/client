import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import { Button, Modal, Avatar } from "antd";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import CoverCreateForm from "./forms/CoverCreateForm";


const Cover = () => {
  // state
  const [values, setValues] = useState({
    title: "",
    text: "",
    video: {},
    image: {},
    uploading: false,
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadImageText, setUploadImageText] = useState("Upload Image");
  const [uploadVideoText, setUploadVideoText] = useState("Upload Video");
  const [coverData, setCoverData] = useState({});
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [covers, setCovers] = useState([]);

  useEffect(() => {
    loadCovers();
    // console.log(loadUsers())
    }, []);

    const loadCovers = async () => {
      const { data } = await axios.get("/api/get-covercontent");
      setCovers(data);
      console.log("data" ,data)
    }
    //   
  // router
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadImageText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/post-coverphoto", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, image: data, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/remove-coverphoto", { image });
      setImage({});
      setPreview("");
      setUploadImageText("Upload Image");
      setValues({ ...values, image: {}, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/remove-covervideo`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadVideoText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };


  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadVideoText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/post-covervideo`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        // console.log(values);
        const {data} = await axios.post(`/api/post-covercontent`, {
            ...values,
        });
        // setCoverData(data);
        toast("Cover content added");
        router.push("/admin");
    } catch (err) {
        toast(err.response.data);
    }

  };

  return (
    <AdminRoute>
      <h1 className="jumbotron text-center square">Admin CoverContent</h1>
      <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Cover
              </Button>
            </div>
      <div className="pt-3 pb-3">
        <Modal
            title="+ Add Cover"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            {/* <CoverCreateForm
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              handleChange={handleChange}
              handleVideo={handleVideo}
              handleVideoRemove={handleVideoRemove}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadImageText={uploadImageText}
              uploadVideoText={uploadVideoText}
              handleImageRemove={handleImageRemove}
              uploading={uploading}
              progress={progress}
            /> */}
        </Modal>
      </div>
      <div className="row">
      {covers.map((cover) => (
                  <div key={cover._id} className="col-sm-12">
                    <h1>{cover.title}</h1>
                    <p>{cover.text}</p>
                    <Avatar size={80} shape="square" src={cover.image ? cover.image.Location : '/'} />

                    {/* <CourseCard course={course} /> */}
                  </div>))}
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}
    </AdminRoute>
  );
};

export default Cover;