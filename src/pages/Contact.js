import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product please feel free to call me.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.pankajmandalplt58@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 9102741711
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;