import JobSeeker from "../../assets/images/JobSeekers.png";
import { Data } from "../data";
import "./LandingPage.css";
const LandingPageJobSeeker = () => {
  return (
    <>
      <div className="JobSeekersMainContainer">
        <div className="jobSeekerHeadingStyle">Job Seekers</div>
        <div className="aboutUsDataContainerStyle">
          <div>
            <img src={JobSeeker} className="jobSeekerImageStyle" />
          </div>
          <div className="jobseekersTextStyle">{Data.JobSeekersData}</div>
        </div>
      </div>
    </>
  );
};
export default LandingPageJobSeeker;
