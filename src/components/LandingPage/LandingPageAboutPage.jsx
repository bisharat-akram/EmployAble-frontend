import { Data } from "../data";
import "./LandingPage.css";
import TeamWork from "../../assets/images/TeamWork.png";
const LandingPageAboutPage = () => {
  return (
    <>
      <div className="aboutPageStyle">
        <div className="aboutUsHeadingStyle">About Us</div>
        <div className="aboutUsDataContainerStyle">
          <div className="aboutUsDataStyle">{Data.AboutUsData}</div>
          <div>
            <img src={TeamWork} className="teamworkImageStyle" />
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPageAboutPage;
