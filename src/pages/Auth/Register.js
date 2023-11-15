import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../../styles/AuthStyles.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const Register = () => {
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    //e stand for event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            userData.append("name", name);
            userData.append("email", email);
            userData.append("password", password);
            userData.append("phone", phone);
            userData.append("photo", photo);
            userData.append("address", address);
            userData.append("answer", answer);
            const res = await axios.post("/api/v1/auth/register", userData);
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <div>
            <Layout title={"Register"}>
                <div className="form-container p-5" style={{ minHeight: "71vh", backgroundColor: "black" }}>
                    <form onSubmit={handleSubmit} style={{ borderRadius: "10px", display: "flex", flexDirection: "column" }}>
                        <h4 className="title">REGISTER</h4>
                        <div className="mb-3">
                            {photo ? (
                                <>

                                    <div className="avatar">
                                        <Avatar alt="Remy Sharp" src={URL.createObjectURL(photo)} style={{height:"100px", width:"100px"}}/>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <label className='btn btn-outline-secondary col-md-12'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                        {/* (image/*) means images of anykind */}
                                    </label>

                                </>
                            )}
                        </div>
                        <TextField className="mb-3" id="outlined-basic" label="Name" variant="outlined" onChange={(e) => { setName(e.target.value) }} required />
                        <TextField className="mb-3" id="outlined-basic" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} required />
                        <TextField
                            className="mb-3"
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            // autoComplete="current-password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <TextField className="mb-3" id="outlined-basic" label="Phone" variant="outlined" onChange={(e) => { setPhone(e.target.value) }} required />
                        <TextField className="mb-3" id="outlined-basic" label="Address" variant="outlined" onChange={(e) => { setAddress(e.target.value) }} required />
                        <TextField className="mb-3" id="outlined-basic" label="Your first school" variant="outlined" onChange={(e) => { setAnswer(e.target.value) }} required />
                        <Button variant="contained" type="submit">Register</Button>
                    </form>

                </div>
            </Layout>
        </div>
    )
}

export default Register
