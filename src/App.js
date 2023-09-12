import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import SignIn from './components/SignIn';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { QueryClientProvider,QueryClient } from "react-query";


export default function App() {

  const queryClient = new QueryClient()

  useEffect(() => {
    const start = async () => {
      try {
        await gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: ""
        });
        await gapi.load('client:auth2');
      } catch (error) {
        console.error('Google API initialization error:', error);
      }
    };

    start();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />}/>
        <Route index element={<SignIn />} />
        <Route path="signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
