import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import MainHeader from './HomeScreen/MainHeader.jsx';
import Footer from './HomeScreen/Footer.jsx';

import Home from './HomeScreen/Home.jsx';
import Help from './HomeScreen/Help.jsx';
import Information from './HomeScreen/Information.jsx';
import Carousel from './HomeScreen/Carousel.jsx';
import Upload from './HomeScreen/Upload.jsx';

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
          <Route path="/upload" element={<Upload />} />
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
