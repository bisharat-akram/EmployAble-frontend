import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import SignIn from './components/SignIn';
import EmployeScreen from './components/EmployeScreen';
import UserScreen from './components/UserScreen';
import PrivateRouting from './routes/PrivateRouting';
import { gapi } from 'gapi-script';

export default function App() {

  useEffect(() => {
    document.title = 'Employable';
    const start = async () => {
      try {
        await gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: '',
        });
        await gapi.load('client:auth2');
      } catch (error) {
        console.error('Google API initialization error:', error);
      }
    };

    start();
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
