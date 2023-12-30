import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
              "https://watchcart-backend.onrender.com/api/v1/auth/login",
              { email, password }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
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
            <Layout title={"Login"}>
                <div className="form-container" style={{ minHeight: "71vh", backgroundColor:"black"}}>
                    <form onSubmit={handleSubmit} style={{borderRadius:"10px",display: "flex", flexDirection: "column"}}>
                        <h4 className="title">LOGIN</h4>

                        <div className="mb-3 ">
                            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>

                        <div className="mb-3">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                // autoComplete="current-password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <div className='forgot-pass-btn' onClick={() => { navigate("/forgot-password") }}>
                                Forgot Password ?
                            </div>

                            <br />

                            <Button variant="contained" type="submit">Login</Button>


                        </div>

                    </form>

                </div>
            </Layout>
        </div>
    )
}

export default Login
