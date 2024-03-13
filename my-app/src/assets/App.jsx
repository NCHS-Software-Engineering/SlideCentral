import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ProtectedRoute from './ProtectedRoute';
import MainHeader from './HomeScreen/MainHeader.jsx';
import Footer from './HomeScreen/Footer.jsx';

import Home from './HomeScreen/Home.jsx';
import Help from './HomeScreen/Help.jsx';
import Information from './HomeScreen/Information.jsx';
import Carousel from './HomeScreen/Carousel.jsx';

import Dashboard from './SignedIn/Dashboard/Dashboard.jsx';
import SignedInNavbar from "./SignedIn/SignedInNavbar.jsx";

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
        <Route path="/*" element={<Layout />} />
        <Route path="dashboard/*" element={<ProtectedRoute component={SignedInLayout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;