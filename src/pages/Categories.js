import React, { useState, useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import Layout from "../components/layout/Layout";
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div className="container">
                <div className="row my-5">
                    {categories.map((c) => (
                        <div className="col-md-6 categories-map" key={c._id}>
                            <Link to={`/category/${c.slug}`} className='categories-link'>{c.name}</Link>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Categories
