import NavLogo from './images/sclogo1.png';
import {NavLink} from 'react-router-dom';

function MainHeader() {
  return (
    <header>
      <nav>
            <ul>
                <li><NavLink to="/"><img src={NavLogo} alt="Slide Central Logo" class="nav-logo"/></NavLink></li>

                <li><NavLink to="/" className="wordlinks">Home</NavLink></li>
                <li><NavLink to="/" className="wordlinks">Slideshow</NavLink></li>
                <li><NavLink to="/help" className="wordlinks">Help</NavLink></li>
                <li><NavLink to="/information" className="wordlinks">Information</NavLink></li>
            </ul>
        </nav>
    </header>   
  );
}

export default MainHeader;