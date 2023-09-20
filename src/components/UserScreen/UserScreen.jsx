import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";
import UserProfile from "../UserProfile";
import UserEmployment from "../UserEmployment";
import { Button } from "antd";
import "./UserScreen.css";

const UserScreen = () => {
  const navigate = useNavigate();
  const handleLogoutSuccess = () => {
    console.log("User logged out successfully");
    deleteToken();
    navigate("/");
  };
  return (
    <>
      <div className="UserScreenContainer">
        <UserProfile />
        {/* <Button
          type="primary"
          onClick={handleLogoutSuccess}
          block
          style={{ width: "100px", height: "50px" }}
        >
          Logout
        </Button> */}
      </div>
    </>
  );
};
export default UserScreen;
