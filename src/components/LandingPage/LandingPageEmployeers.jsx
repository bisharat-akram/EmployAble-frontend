import { Data } from "../data";
import Employeers from "../../assets/images/Employeers1.png";

const LandingPageEmployeers = () => {
  return (
    <>
      <div className="aboutPageStyle">
        <div className="aboutUsHeadingStyle">Employeers</div>
        <div className="aboutUsDataContainerStyle">
          <div className="aboutUsDataStyle">{Data.EmployersData}</div>
          <div>
            <img src={Employeers} className="teamworkImageStyle" />
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPageEmployeers;
