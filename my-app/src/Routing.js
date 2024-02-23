
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import {Home} from './Pages/Home';  
import {Help} from './Pages/Help';
import {Information} from './Pages/Information';
import {SignIn} from './Pages/signedin/SignIn';


export const Routing = () => {
  return (
    <Router> 
      <Routes> 
        <Route path="/help" element = {   <Help />  } />
        <Route path="/information" element = {   <Information />  } />
        <Route path="/signin" element = {   <SignIn />  } />
      </Routes> 
    </Router> 
  )
}
