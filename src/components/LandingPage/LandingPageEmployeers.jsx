import { Data } from "../data";
import Employeers from "../../assets/images/Employeers1.png";
import { Button } from "antd";
import { useNavigate } from "react-router";

const LandingPageEmployeers = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="aboutPageStyle">
        <div className="aboutUsHeadingStyle">Employers</div>
        <div className="aboutUsDataContainerStyle">
          <div>
            <div className="aboutUsDataStyle">{Data.EmployersData}</div>
            <Button
              className="LandingPageEmployerButtonStyle"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {Data.EmployersButton}
            </Button>
          </div>
          <div>
            <img src={Employeers} className="teamworkImageStyle" />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
export default LandingPageEmployeers;
