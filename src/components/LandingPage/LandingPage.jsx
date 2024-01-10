import LandingPageNav from "./LandingPageNav";
import { Data } from "../../components/data.js";
import { Button } from "antd";
import LandingPageAboutPage from "./LandingPageAboutPage";
import LandingPageJobSeeker from "./LandingPageJobSeeker";
import LandingPageEmployeers from "./LandingPageEmployeers";
import LandingPageConatctForm from "./LandingPageContactForm";
import "./LandingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Insta from "../../assets/images/instaIcon.jpeg";
import Facebook from "../../assets/images/facebookIcon.png";
import Twitter from "../../assets/images/twitterIcon.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <>
      <div>
        <LandingPageNav />
        <div
          style={{
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          <div className="LandingPageMainHeading">{Data.Heading}</div>
          <div className="LandingPageMainSubHeading">{Data.SubHeading}</div>
          <div className="LandingPageButtonDivStyle">
            <Button
              className="LandingPageButtonStyle"
              onClick={() => {
                navigate("/signin");
              }}
            >
              {Data.LandingPageButton}
            </Button>
          </div>
        </div>
        <div id="about">
          <LandingPageAboutPage />
        </div>
        <div id="jobSeekers">
          <LandingPageJobSeeker />
        </div>
        <div id="employers">
          <LandingPageEmployeers />
        </div>
        <div id="contactUs">
          <LandingPageConatctForm />
        </div>
        <div className="LandingPageFooterMain">
          <InstagramOutlined style={{ color: "white", margin: "5px" }} />
          <FacebookOutlined style={{ color: "white", margin: "5px" }} />
          <TwitterOutlined style={{ color: "white", margin: "5px" }} />
        </div>
      </div>
    </>
  );
};
export default LandingPage;
