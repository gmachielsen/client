import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../forms/LocalSearch";
import axios from "axios";
import Link from "next/link";
import AdminRoute from "../../../components/routes/AdminRoute";
import { Button } from 'antd';
import router from 'next/router';

const SubCategoryCreate = () => {
  const [values, setValues] = useState({
    name: "",
    category: "",
  });
  // const [name, setName ] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    console.log("subcategories", subcategories, "subcategories");
  }, []);

  // const loadCategories = () =>
  //   getCategories().then((c) => setCategories(c.data));
  // const loadSubs = () => getSubs().then((s) => setSubs(s.data));

const loadCategories = async () => {
  await axios.get("/api/admin/categories")
  .then((c) => setCategories(c.data));
 }

 const loadSubCategories = async () => {
   await axios.get("/api/admin/subcategories")
   .then((c) => setSubCategories(c.data));
 }

 const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name);
    try {
      setLoading(true);
      await axios.post(`/api/admin/createsubcategory`, 
        values,
      )
        // console.log(res)
        setLoading(false);
        setValues("");
        // toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
    } catch (err) {
      console.log(err);
      setLoading(false)
      console.log(err);
    }
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    console.log("slug in handleRemove", slug);
    if (window.confirm("Delete?")) {
      try {
        await axios.delete(`/api/admin/remove-subcategory/${slug}`);
        setLoading(false);
        loadSubCategories();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


  const subCategoryForm = () => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <br/>
            <label>Name</label>
            <input
                type="text"
                name="name"
                className="form-control"
                placeholder="name"
                //  value={name}
                onChange={handleChange}                
                autoFocus
            />
            <br/>
            <button className="btn btn-outline-primary">Save</button>
     </div>
    </form>
);

  return (
    <AdminRoute>
    <div className="container-fluid">
      <div className="row">
      
        <div className="col">
        <div className="jumbotron text-center square">                    
            {loading ? (
                <h1 className="text-danger">Loading..</h1>
            ) : (
                <h1>Create subcategory</h1>
            )}
        </div>

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleChange}            
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {subCategoryForm()}


          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {subcategories.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link href={`/admin/subcategory/edit/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AdminRoute>
  );
};

export default SubCategoryCreate;