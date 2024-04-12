import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom"; 
import { useEffect } from 'react';
import MainHeader from './HomeScreen/MainHeader.jsx';
import Footer from './HomeScreen/Footer.jsx';

import Home from './HomeScreen/Home.jsx';
import Help from './HomeScreen/Help.jsx';
import Information from './HomeScreen/Information.jsx';
import Carousel from './HomeScreen/Carousel.jsx';
import Upload from './HomeScreen/Upload.jsx';

import Dashboard from './Dashboard/Dashboard.jsx';
import SignedInNavbar from "./Dashboard/SignedInNavbar.jsx";

import ActivityDashboard from "./Dashboard/ActivityDashboard/ActivityDashboard.jsx";
import SlideCreationHomePage from "./Dashboard/SlideCreation/SlideCreationHomePage.jsx";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.state?.from || '/');
  }, [navigate, location.state]);
  return null;
}

function ProtectedRoute(props) {
  const isUserLoggedIn = sessionStorage.getItem('userId') !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <Route {...props} element={isUserLoggedIn ? props.element : <></>} />
  );
}


function Layout() {
  return (
    <div className="App">
      <MainHeader />
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/slideshow" element={<Carousel />} />
          <Route path="/help" element={<Help />} />
          <Route path="/information" element={<Information />} />
          <Route path = "/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
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
          <Route index element={<Dashboard/>} />
          <Route path="activity-dashboard" element={<ActivityDashboard />} />
          <Route path="activity-dashboard/slide-creation" element={<SlideCreationHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/slideshow" element={<Carousel />} />
        <Route path="/help" element={<Help />} />
        <Route path="/information" element={<Information />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/activity-dashboard" element={<ProtectedRoute><ActivityDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;