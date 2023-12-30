import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://watchcart-backend.onrender.com/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All orders</h1>
            {
              orders?.map((o, i) => {
                return (
                  <div className="border shadow my-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          {/* first install the package moment */}
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mt-2 p-3 flex-row" key={p._id}>
                          <div className="col-md-3 user-orders-img">
                            <img
                              src={`https://watchcart-backend.onrender.com/api/v1/product/get-photo/${p._id}`}
                              alt={p.name}
                              height={"200px"}
                            />
                          </div>
                          <div className="col-md-9">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
