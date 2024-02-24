import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import MainHeader from './MainHeader.jsx';
import Footer from './Footer.jsx';

import Home from './Home.jsx';
import Help from './Help.jsx';
import Information from './Information.jsx';
import Carousel from './Carousel.jsx';

import SignIn  from './SignedIn/SignIn.jsx';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
