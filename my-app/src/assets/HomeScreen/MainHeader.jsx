import axios from 'axios';
import NavLogo from '../Media/images/sclogo1.png';
import {NavLink, useNavigate} from 'react-router-dom';
import './Style.css';
import './Background.css';
import React, { useEffect, useState} from 'react';

function MainHeader() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.clear();
    setIsUserLoggedIn(false);
    // Redirect the user to the home page
    navigate("/");
  };


  useEffect(() => {
    if (!isUserLoggedIn && window.google && !document.getElementById('sign-in-with-google').hasChildNodes()) {
      window.google.accounts.id.initialize({
        client_id: '850963190516-cr7nme98i8i30huscmvl4g79q7pbo12d.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById('sign-in-with-google'),
        { theme: 'outline', size: 'large' }  // customization attributes
      );
    }
  }, [isUserLoggedIn]);

  function handleCredentialResponse(response) {
    const jwt = response.credential;
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
    
        console.log('ID: ' + payload.sub);
        console.log('Name: ' + payload.name);
        console.log('Image URL: ' + payload.picture);
        console.log('Email: ' + payload.email);

        let userType;
        if (payload.email === 'cafurby@stu.naperville203.org' || payload.email === 'sryerabati@stu.naperville203.org'|| payload.email === 'pjprobst@stu.naperville203.org'|| payload.email === 'dtkosloski@stu.naperville203.org') {
            const isTeacher = window.confirm('Are you a teacher?');
            userType = isTeacher ? 'teacher' : 'student';
        } else {
            // Determine if the user is a student or a teacher based on the email domain
            userType = payload.email.endsWith('@stu.naperville203.org') ? 'student' : 'teacher';
        }

        const userTypeTF = userType.endsWith('student') ? 0 : 1;
        axios.post('http://localhost:5000/api/save', { sub: payload.sub, sub2: payload.name, sub3: userTypeTF })
        console.log('User type: ' + userType);

    // Store the user type in the session storage
    sessionStorage.setItem('userId', payload.sub);
    sessionStorage.setItem('userType', userType);
    setIsUserLoggedIn(true);

    // navigate("/dashboard");
  }

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
          {!isUserLoggedIn && 
            <li>
              <div className="signin-container">
                <span className="signin-text">Sign in Here --</span>
                <div id="sign-in-with-google"></div>
              </div>
            </li>
          }
        </ul>
      </nav>
    </header>   
  );
}

export default MainHeader;