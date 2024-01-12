// LandingPageNav.js

import { Button } from "antd";
import Logo from "../../assets/images/Logo2.png";
import "./LandingPage.css";
import { useNavigate } from "react-router";

const LandingPageNav = () => {
  const navigate = useNavigate();

  return (
    <div className="LandingPageNavMain">
      <div
        mode="horizontal"
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginLeft: "40px",
          marginRight: "40px",
        }}
      >
        <div key="logo" style={{ marginTop: "15px" }}>
          <a href="/">
            <img src={Logo} alt="EmployAble Logo" height={60} />
          </a>
        </div>
        <div key="about">
          <a href="#about" className="LandingPageNavClass">
            About Us
          </a>
        </div>
        <div key="jobSeekers">
          <a href="#jobSeekers" className="LandingPageNavClass">
            Job Seekers
          </a>
        </div>
        <div key="employers">
          <a href="#employers" className="LandingPageNavClass">
            Employers
          </a>
        </div>
        <div key="contactUs">
          <a href="#contactUs" className="LandingPageNavClass">
            Contact Us
          </a>
        </div>
        <div key="login" style={{ marginLeft: "auto" }}>
          <Button
            className="LandingPageLoginButton"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNav;
