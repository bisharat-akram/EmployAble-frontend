import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";
import { Button } from "antd";

const EmployeScreen = () => {
  const navigate = useNavigate();
  const handleLogoutSuccess = () => {
    console.log("User logged out successfully");
    deleteToken();
    navigate("/");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h2> Employee Screen</h2>

        <Button
          type="primary"
          onClick={handleLogoutSuccess}
          block
          style={{ width: "100px", height: "50px" }}
        >
          Logout
        </Button>
      </div>
    </>
  );
};
export default EmployeScreen;
