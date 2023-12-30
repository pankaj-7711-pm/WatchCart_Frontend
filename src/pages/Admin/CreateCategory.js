import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';
import {Modal} from "antd";
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name,setName]=useState("");
    const [visible,setVisible]=useState(false);
    const [selected,setSelected]=useState(null);
    const [updatedName,setUpdatedName]=useState("");

    //handle form
    const handleSubmit=async(e)=>{
       e.preventDefault();
       try {
            const { data } = await axios.post(
              "https://watchcart-backend.onrender.com/api/v1/category/create-category",
              { name }
            );
            if(data.success){
                toast.success(`${data.category.name} is created`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }

       } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
       }
    }
    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
              "https://watchcart-backend.onrender.com/api/v1/category/get-category"
            );
            if (data?.success) {
                // console.log(data.category);
                setCategories(data?.category);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting category");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //update category
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try {
            const { data } = await axios.put(
              `https://watchcart-backend.onrender.com/api/v1/category/update-category/${selected._id}`,
              { name: updatedName }
            );
            if(data.success){
                toast.success(`${updatedName} is updated successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
        //    console.log(error);
           toast.error("Something went wrong"); 
        }
    }

    //delete category
    const handleDelete=async(id)=>{
        
        try {
            const { data } = await axios.delete(
              `https://watchcart-backend.onrender.com/api/v1/category/delete-category/${id}`
            );
            if(data.success){
                toast.success(`Category is Deleted successfully`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
        //    console.log(error);
           toast.error("Something went wrong"); 
        }
    }
    return (
        <Layout title={"Dashboard-Create Category"}>
            <div className="conatiner-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <div className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}>
                                                        Edit
                                                    </div>
                                                    <div className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>
                                                        Delete
                                                    </div>
                                                </td>
                                            </tr>
                                        </>

                                    ))}


                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                        </Modal>
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
