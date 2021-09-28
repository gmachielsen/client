import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminRoute from "../../../../components/routes/AdminRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const SubCategoryUpdate = () => {

  // const [values, setValues] = useState({
  //   name: "",
  //   category: "",
  // });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, [slug]);

  const loadCategories = async () => {
    await axios.get("/api/admin/categories")
    .then((c) => setCategories(c.data));
  }

  const loadSubCategory = async () => {
    await axios.get(`/api/admin/get-subcategory/${slug}`)
    .then((s) => { setName(s.data.name);
                 setParent(s.data.parent)
    })
  }
//   const { data } = await axios.get(`/api/admin/get-category/${slug}`)
// ;
//     setCategory(data);

//   const loadSubCategories = async () => {
//     await axios.get("/api/admin/subcategories")
//     .then((c) => setSubCategories(c.data));
//   }
//   const loadSubCategory = () => getSub(match.params.slug).then((s) => {
//       setName(s.data.name);
//       setParent(s.data.parent);
//   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name);
    try {
      setLoading(true);
      await axios.put(`/api/admin/update-subcategory/${slug}`,
        {parent, name} 
      ).then(
        setLoading(false),
        toast.success("subcategory updated!")
        // router.push('/admin/subcategory/create')
      );
    } catch (err) {
      console.log(err);
    }
    
    // .then((res) => {
    //     // console.log(res)
    //   setLoading(false);
    //   setName("");
    //     // toast.success(`"${res.data.name}" is updated`);
    //     router.push('/admin/subcategory/create');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     if (err.response.status === 400) toast.error(err.response.data);
    //   });
  };


  return (
    <AdminRoute>
    <div className="container-fluid">
      <div className="row">
   
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent }>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br/>
            <button className="btn btn-outline-primary">Save</button>
        </div>
    </form>

        </div>
      </div>
    </div>
    </AdminRoute>
  );
};

export default SubCategoryUpdate;