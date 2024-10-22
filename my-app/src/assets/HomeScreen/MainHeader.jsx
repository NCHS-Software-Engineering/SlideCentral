import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import NavLogo from '../Media/images/sclogo1.png';
import './Background.css';
import './Style.css';

function MainHeader() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('sessionKey') !== null);

  const handleLogout = () => {
    // Clear the session storage
    localStorage.removeItem('sessionKey');
    setIsUserLoggedIn(false);
    // Redirect the user to the home page
    navigate("/");
  };


  useEffect(() => {
    //ADD TO SEE IF USER IS LOGGED IN AND THEN ADD THE USER INFO IN SESSION STORAGE !!!!!!



    
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
        }
        else {
            userType = payload.email.endsWith('@stu.naperville203.org') ? 'student' : 'teacher';
        }

        const userTypeTF = userType.endsWith('student') ? 0 : 1;
        axios.post('http://localhost:5000/api/save', { sub: payload.sub, sub2: payload.name, sub3: userTypeTF, sub4: payload.email })
          .then(response => {
            console.log('Save successful:', response.data);
          })
          .catch(error => {
            console.error('Error during save:', error);
          });
        axios.post('http://localhost:5000/login', { userId: payload.sub })
          .then((response) => {
              console.log('User logged in successfully');

              const sessionKey = response.data.sessionKey;
              localStorage.setItem('sessionKey', sessionKey);
            })
            .catch(err => {
              console.error('Error logging user in', err);
            });
        console.log('User type: ' + userType);

    // Store the user type in the session storage
    sessionStorage.setItem('userId', payload.sub);
    sessionStorage.setItem('userType', userType);
    setIsUserLoggedIn(true);

    // navigate("/dashboard");
  }

  // ...
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
            <div className="signin-container">
              {isUserLoggedIn ? (
                <>
                  <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </>
              ) : (
                <>
                  <div id="sign-in-with-google"></div>
                </>
              )}
            </div>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;