import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import {useEffect} from 'react';
import MainHeader from './HomeScreen/MainHeader.jsx';
import Footer from './HomeScreen/Footer.jsx';

import Home from './HomeScreen/Home.jsx';
import Help from './HomeScreen/Help.jsx';
import Information from './HomeScreen/Information.jsx';
import Carousel from './HomeScreen/Carousel.jsx';

import SignIn  from './SignedIn/SignIn.jsx';
import Dashboard from './SignedIn/Dashboard/Dashboard.jsx';
import SignedInNavbar from "./SignedIn/SignedInNavbar.jsx";

function Layout() {
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "850963190516-cr7nme98i8i30huscmvl4g79q7pbo12d.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, []);

  return (
    <div className="App">
      <MainHeader />
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/slideshow" element={<Carousel />} />
          <Route path="/help" element={<Help />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      </div>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
}

function SignedInLayout() {
  return (
    <div className="App">
      <SignedInNavbar />
      <div className="signedin-content">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="signedin/*" element={<SignedInLayout />} />
      </Routes>
    </Router>
  );
}

export default App;