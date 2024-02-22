import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Help from './Pages/Help';
import Home from './Pages/Home';
import logo from './logo1.png';

import{Routing} from "./Routing";


function App() {
  return (
    <>
      <Routing />
      <Home />
    </>
  );
}

export default App;
