import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const { data } = await axios.get(
              `https://watchcart-backend.onrender.com/api/v1/product/search/${values.keyword}`
            );
            setValues({
                ...values,
                results:data
            })
            // console.log(values);
            navigate("/search");
        } catch (error) {
            // console.log(error);
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2 search-input" type="search" placeholder="Ask me ?" aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value,})}/>
                <button className="btn btn-outline-dark search-button" type="submit" style={{color:"white", border:"1px solid white"}}>Search</button>
            </form>
        </div>
    )
}

export default SearchInput
