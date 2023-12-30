import Layout from '../../components/layout/Layout'
import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [product, setProduct] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
              "https://watchcart-backend.onrender.com/api/v1/product/get-product"
            );
            setProduct(data.products);
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col md-9 ">
              <h1 className="text-center">All Products List</h1>
              <div className="d-flex flex-wrap">
                {product.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                  >
                    <div
                      className="card m-2"
                      style={{ width: "18rem" }}
                      key={p._id}
                    >
                      <img
                        src={`https://watchcart-backend.onrender.com/api/v1/product/get-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Products
