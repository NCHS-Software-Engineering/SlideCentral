import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ProtectedRoute from './ProtectedRoute';
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
  return <h2>This page doesn't exist</h2>;
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
        <Route path="dashboard/*" element={<ProtectedRoute component={SignedInLayout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;