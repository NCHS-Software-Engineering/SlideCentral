import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import MainHeader from './MainHeader.jsx';
import Footer from './Footer.jsx';

import Home from './Home.jsx';
import Help from './Help.jsx';
import Information from './Information.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <div className = "content">
          <Routes>
            <Route index element={<Home/>} />
            <Route path="/help" element={<Help />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
