import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import Avatar from '@mui/material/Avatar';
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("password", password);
      userData.append("phone", phone);
      userData.append("photo", photo);
      userData.append("address", address);
      const { data } = await axios.put(
        "https://watchcart-backend.onrender.com/api/v1/auth/profile",
        userData
      );
      // console.log(data);
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container" style={{ minHeight: "70vh" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  {photo ? (
                    <>

                      <div className="avatar">
                        <Avatar alt="Remy Sharp" src={URL.createObjectURL(photo)} style={{ height: "100px", width: "100px" }} />
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
                <div className="mb-3">
                  <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder='Enter Your Name' required autoFocus />
                </div>
                <div className="mb-3">
                  <input type="email" value={email}  className="form-control" placeholder='Enter Your Email' required disabled />
                </div>

                <div className="mb-3">
                  <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder='Enter Your Password' required />
                </div>
                <div className="mb-3">
                  <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" placeholder='Enter Your Phone' required />
                </div>
                <div className="mb-3">
                  <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" placeholder='Enter Your Address' required />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
