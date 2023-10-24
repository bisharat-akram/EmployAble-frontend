import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import SignIn from "./components/SignIn";
import EmployeScreen from "./components/EmployeScreen";
import UserScreen from "./components/UserScreen";
import PrivateRouting from "./routes/PrivateRouting";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

const TRACKING_ID = "G-9HZHLHWQ7P"; // Replace with your GA Tracking ID
ReactGA.initialize(TRACKING_ID);
export default function App() {
  useEffect(() => {
    document.title = "Employable";
  }, []);

  return (
    <BrowserRouter>
      <GAListener>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="employe"
            element={
              <PrivateRouting>
                <EmployeScreen />
              </PrivateRouting>
            }
          />
          <Route
            path="user"
            element={
              <PrivateRouting>
                <UserScreen />
              </PrivateRouting>
            }
          />
        </Routes>
      </GAListener>
    </BrowserRouter>
  );
}
function GAListener({ children }) {
  let location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return children;
}
