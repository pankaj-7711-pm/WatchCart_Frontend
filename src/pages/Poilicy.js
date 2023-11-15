import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Order once placed cannot be cancelled.</p>
          <p>Maintain the decorem in the review section of each product</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;