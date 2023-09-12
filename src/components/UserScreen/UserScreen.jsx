import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";

const UserScreen = () => {
  const navigate = useNavigate();
  const handleLogoutSuccess = () => {
    console.log("User logged out successfully");
    deleteToken();
    navigate("/");
  };
  return (
    <>
      UserScreen
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={handleLogoutSuccess}
      />
    </>
  );
};
export default UserScreen;
