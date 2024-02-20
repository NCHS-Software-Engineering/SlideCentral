
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Home from './Home';  
import Help from './Help';

export const Routes = () => {
  return (
    <Router> 
      <Switch> 
      <Route path="/" exact>
            <Home />
        </Route> 

        <Route path="/help" exact>
            <Help />
        </Route> 
      </Switch> 
    </Router> 
  )
}
