import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import SignIn from './components/SignIn';
import EmployeScreen from './components/EmployeScreen';
import UserScreen from './components/UserScreen';
import PrivateRouting from './routes/PrivateRouting';

export default function App() {

  useEffect(() => {
    document.title = 'Employable';
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={
              <SignIn />
            } 
          />
          <Route
            path="signup"
            element={
              <Signup />
            } 
          />
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
      </BrowserRouter>
  );
}
