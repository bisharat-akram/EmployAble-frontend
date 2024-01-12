import JobSeeker from "../../assets/images/JobSeekers.png";
import { Data } from "../data";
import "./LandingPage.css";
import { Button } from "antd";
import { useNavigate } from "react-router";
const LandingPageJobSeeker = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="JobSeekersMainContainer">
        <div className="jobSeekerHeadingStyle">Job Seekers</div>
        <div className="aboutUsDataContainerStyle">
          <div>
            <img src={JobSeeker} className="jobSeekerImageStyle" />
          </div>
          <div>
            <div className="jobseekersTextStyle">{Data.JobSeekersData}</div>
            <Button
              className="LandingPagejobSeekerButtonStyle"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {Data.JobSeekerButton}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPageJobSeeker;
