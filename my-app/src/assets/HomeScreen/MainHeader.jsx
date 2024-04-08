import NavLogo from '../Media/images/sclogo1.png';
import {NavLink, useNavigate} from 'react-router-dom';
import './Style.css';
import './Background.css';

function MainHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect the user to the home page
    navigate("/");
  };

  const isUserLoggedIn = sessionStorage.getItem('userId') !== null;

  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/"><img src={NavLogo} alt="Slide Central Logo" className="nav-logo"/></NavLink></li>
          <li><NavLink to="/" className="wordlinks">Home</NavLink></li>
          <li><NavLink to="/slideshow" className="wordlinks">Slideshow</NavLink></li>
          <li><NavLink to="/help" className="wordlinks">Help</NavLink></li>
          <li><NavLink to="/information" className="wordlinks">Information</NavLink></li>
          {isUserLoggedIn && <li><NavLink to="/dashboard" className="wordlinks">Dashboard</NavLink></li>}
          {isUserLoggedIn && <li><button onClick={handleLogout} className="logout-button">Log out</button></li>}
        </ul>
      </nav>
    </header>   
  );
}

export default MainHeader;