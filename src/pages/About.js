import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            This is the complete Ecommerce website. This Website is for purchasing Watches. The MERN technology is used to build this website. Here user can purchase watches and admin can control the orders. Admin route is protected. Here Users can view product, add the product to cart, make payment, login, register, give reviews and admin can create product, create category, update product and category also modify the status of the current order.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;