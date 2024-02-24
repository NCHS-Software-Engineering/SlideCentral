import NavLogo from '../Media/images/sclogo1.png';
import {NavLink} from 'react-router-dom';
import './Style.css';
import './Background.css';

function MainHeader() {
  return (
    <header>
      <nav>
            <ul>
                <li><NavLink to="/"><img src={NavLogo} alt="Slide Central Logo" className="nav-logo"/></NavLink></li>

                <li><NavLink to="/" className="wordlinks">Home</NavLink></li>
                <li><NavLink to="/slideshow" className="wordlinks">Slideshow</NavLink></li>
                <li><NavLink to="/help" className="wordlinks">Help</NavLink></li>
                <li><NavLink to="/information" className="wordlinks">Information</NavLink></li>
            </ul>
        </nav>
    </header>   
  );
}

export default MainHeader;