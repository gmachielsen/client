import React, {useEffect, useState} from 'react'
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../forms/LocalSearch";
import axios from "axios";
import Link from "next/link";
import AdminRoute from "../../../components/routes/AdminRoute";
import { Button } from 'antd';
import router from 'next/router';


const CategoryCreate = () => {
    const [name, setName ] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
        // console.log(loadUsers())
        }, []);

    const loadCategories = async () => {
         await axios.get("/api/admin/categories")
        .then((c) => setCategories(c.data));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            await axios.post(`/api/admin/create-category`, name);
            loadCategories();
            toast("Category added");
            router.push("/admin/category/create");
        } catch (err) {
            // toast(err.response.data);
        }
    }

    const handleRemove = async (slug) => {
        console.log("heeee", slug);
        try {
            await axios.delete(`/api/admin/remove-category/${slug}`);
            loadCategories();
            toast("Category deleted");
            router.push("/admin/category/create"); 
        } catch (err) {
            console.log(err);
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
                    {/* <CategoryForm 
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    /> */}
                    <br />
                    {/* step 2 and 3  see form localserach.js */ }
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* step 5 */}
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span onClick={() => handleRemove(c.slug)} 
                            className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link href={`/admin/category/edit/${c.slug}`}>
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

export default CategoryCreate;