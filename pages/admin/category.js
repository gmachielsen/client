import React, { useState, useEffect } from "react";
import AdminRoute from "../../components/routes/AdminRoute";
import { Button, Modal } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import CategoryCreateForm from "./forms/CategoryCreateForm";
import axios from "axios";



const Category = () => {
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);

    const [name, setName] = useState("");

    useEffect(() => {
        loadCategories();
        // console.log(loadUsers())
        }, []);

    const loadCategories = async () => {
        const { data } = await axios.get("/api/admin/categories");
        setCategories(data);
        console.log("categories", data, "categories");
    }

    // const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // };



      // router
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            const {data} = await axios.post(`/api/admin/create-category`, name);
            toast("Category added");
            router.push("/admin/category");
        } catch (err) {
            toast(err.response.data);
        }
    }

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center square">Admin Categories</h1>
            <div className="row">
                    <Button
                        onClick={() => setVisible(true)}
                        className="col-md-6 offset-md-3 text-center"
                        type="primary"
                        shape="round"
                        icon={<UploadOutlined />}
                        size="large"
                    >
                Add Category
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
            {/* <CategoryCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              name={name}
              setName={setName}
           
            /> */}
<form onSubmit={handleSubmit}>
     <div className="form-group">
       <input
         type="text"
         name="name"
         className="form-control"
         placeholder="name"
        //  value={name}
         onChange={(e) => setName({ name: e.target.value })}

       />
     </div>
      <br/>

    

     <div className="row">
       <div className="col">
         <Button
           onClick={handleSubmit}
           className="btn btn-primary"
           type="primary"
           size="large"
           shape="round"
         >
           Save
         </Button>
       </div>
     </div>
   </form>
        </Modal>
      </div>
      <div className="row">
      {categories.map((category) => (
        <div key={category._id} className="col-sm-12">
          <hr className="col-8 offset-2" />
            <h1 className="text-center">{category.name}</h1>
          <hr className="col-8 offset-2" />
            {/* <p>{category.slug}</p> */}
        </div>))}
      </div>
        </AdminRoute>
    );
};

export default Category;