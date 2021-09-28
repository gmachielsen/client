import React, {useEffect, useState} from 'react'
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../forms/LocalSearch";
import axios from "axios";
import Link from "next/link";
import AdminRoute from "../../../../components/routes/AdminRoute";
import { Button } from 'antd';
import { useRouter } from "next/router";


const CategoryEdit = () => {
    const [name, setName ] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCategory();
    }, [slug]);

 const loadCategory= async () => {
    const { data } = await axios.get(`/api/admin/get-category/${slug}`);
    setCategory(data);
    // console.log("data", data, "ds");
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/update-category/${slug}`, name);
            console.log(name, "name")
            // loadCategory();
            toast("Category updated");
            router.push("/admin/category/create");
        } catch (err) {
            // toast(err.response.data);
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(name);
    //     setLoading(true);
    //     // createCategory({ name }, user.token)
    //     const { data } = await axios.post(`/api/admin/create-category`, name)
    //     .then(res => {
    //         setLoading(false);
    //         setName('');
    //         toast.success(`"${res.data.name}" is created`);
    //         loadCategories(); // haalt na het toevoegen weer categorietjes op zodat nieuwe er tussenstaat
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         setLoading(false);
    //         if (err.response.status === 400) toast.error(err.response.data);
    //     });
    // };

    // const handleRemove = async (slug) => {
    //     // let answer = window.confirm("Delete?");
    //     // console.log(answer, slug);
    //     if(window.confirm("Delete?")) {
    //         setLoading(true)
    //         removeCategory(slug, user.token)
    //         .then((res) => {
    //             setLoading(false);
    //             toast.error(`${res.data.name} deleted`);
    //             loadCategories(); // haalt na het toevoegen weer categorietjes op zodat nieuwe er t
    //         })
    //         .catch(err => {
    //             if (err.response.status === 400) {
    //             setLoading(false);
    //             toast.error(err.response.data);
    //             }
    //         });
    //     }
    // };

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <br/>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="name"
                    // placeholder={ category.name }
                    //  value={name}
                    onChange={(e) => setName({ name: e.target.value })}
                    autoFocus
                />
                <br/>
                <button className="btn btn-outline-primary">Save</button>
         </div>
        </form>
    );
    



    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
    return (
        <AdminRoute>
        <div className="container-fluid">
        <div className="jumbotron text-center square">                    
            {loading ? (
                <h1 className="text-danger">Loading..</h1>
            ) : (
                <h1>Create Category</h1>
            )}
        </div>

            <div className="row">
                <div className="col">

                    {categoryForm()}
              
                    <br />

                </div>
            </div>
        </div>
        </AdminRoute>
    );
};

export default CategoryEdit;