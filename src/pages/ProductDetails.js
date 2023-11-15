import React, { useState, useEffect } from 'react'
import Layout from "../components/layout/Layout"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCart();
    const [relatedProducts, setRelatedProducts] = new useState([]);
    const params = useParams();

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params.slug])

    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            // console.log(error);
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <Layout>
            <div >
                <div className="row container-fluid mt-2 " style={{ minHeight: "70vh" }}>
                    <div className="col-md-6 product-details-img">
                        <img src={`/api/v1/product/get-photo/${product._id}`} alt={product.name} height={400} width={400} />
                    </div>
                    <div className="col-md-6 product-details-details">
                        <div>
                            <h1>{product.name}</h1>
                            <h6>{product.description}</h6>
                            <h6>$ {product.price}</h6>
                            {/* {JSON.stringify(product,null,4)} */}
                            <h6>Category : {product?.category?.name}</h6>
                            <button className='btn btn-secondary' onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                toast.success("Item Added to Cart")
                            }}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div className="row container-fluid mb-3">
                    <h3 className='text-center mb-3'>Similar Products</h3>
                    {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
                    <div className="d-flex flex-wrap similar-product">
                        {relatedProducts.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <button className="btn btn-secondary" onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                        toast.success("Item Added to Cart")
                                    }}>ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default ProductDetails
