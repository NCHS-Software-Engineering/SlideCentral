import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
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
      <div className="content">
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