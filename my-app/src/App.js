import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Head from './Head.jsx';
import MainHeader from './MainHeader.jsx';
import Footer from './Footer.jsx';

import Home from './Home.jsx';
import Help from './Help.jsx';


function App() {
  return (
    <>
      <Router>
        <Head />
        <body>
          <MainHeader />
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/help" component={Help} />
          </Routes>
          <Footer />
        </body>
      </Router>
    </>
  );
}

export default App;
