import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LargeSlideCentralLogo from '../Media/images/sslogonobg1.png';
import './Background.css';
import './Style.css';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: '850963190516-cr7nme98i8i30huscmvl4g79q7pbo12d.apps.googleusercontent.com',
            callback: handleCredentialResponse
          });
          window.google.accounts.id.renderButton(
            document.getElementById('sign-in-with-google'),
            { theme: 'outline', size: 'large' }  // customization attributes
          );
        }
      }, []);

    function handleCredentialResponse(response) {
        const jwt = response.credential;
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
    
        console.log('ID: ' + payload.sub);
        console.log('Name: ' + payload.name);
        console.log('Image URL: ' + payload.picture);
        console.log('Email: ' + payload.email);

        axios.post('http://localhost:5000/api/save', { sub: payload.sub })
            .then(response => console.log(response))
            .catch(error => console.error(error));
    
        let userType;
        if (payload.email === 'cafurby@stu.naperville203.org' || payload.email === 'sryerabati@stu.naperville203.org'|| payload.email === 'pjprobst@stu.naperville203.org'|| payload.email === 'dtkosloski@stu.naperville203.org') {
            // If the email is 'cafurby@stu.naperville203.org or...` , ask the user to choose the user type
            const isTeacher = window.confirm('Are you a teacher?');
            userType = isTeacher ? 'teacher' : 'student';
        } else {
            // Determine if the user is a student or a teacher based on the email domain
            userType = payload.email.endsWith('@stu.naperville203.org') ? 'student' : 'teacher';
        }
        
        console.log('User type: ' + userType);

        // Store the user type in the session storage
        sessionStorage.setItem('userType', userType);
    
        navigate("/dashboard");
    }

    return (
        <main>
            <div className="welcome">
                <div className="welcome-text">
                    <h1>Welcome to <span className="scund">SLIDECENTRAL</span></h1>
                    <p> An app built for Naperville Central students and teachers looking to boost awareness for clubs, activities, and sports. </p>
                </div>
                <img src={LargeSlideCentralLogo} alt="Large Slide Central Logo" className="large-logo"/>
            </div>

            <section className="get-started">
                <div className="get-started-content">
                    <h2>GET STARTED</h2>
                    <p>It's really easy to make a slide for your club, activity, sport, or event! Simply sign in with your student or teacher Google account below to get started.</p>
                    <div className = "mainbuttons">
                        <Link><div id="sign-in-with-google"></div></Link>
                        <Link to="/slideshow"><button className="view-slides">VIEW SLIDES</button></Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;