import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LargeSlideCentralLogo from '../Media/images/sslogonobg1.png';
import axios from 'axios';
import './Background.css';
import './Style.css';

function Home() {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem('userId') !== null);

    const handleDashboardClick = () => {
        if (sessionStorage.getItem('userId') === null) {
            setIsUserLoggedIn(false);
            alert("You need to sign in first to view the dashboard");
        } else {
            setIsUserLoggedIn(true);
            navigate("/dashboard");
        }
    };

    useEffect(() => {
        setIsUserLoggedIn(sessionStorage.getItem('userId') !== null);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsUserLoggedIn(sessionStorage.getItem('userId') !== null);
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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
                    <p>It's really easy to make a slide for your club, activity, sport, or event! Simply sign in with your student or teacher Google account above to get started. Then, visit your dashboard to begin creating activities and slides!</p>
                    <div className="quicklinksfcontainer">
                        <div className="quicklinks-1">
                            <h5>Quick Links:</h5>
                            <div className = "mainbuttons">
                                <Link to="/slideshow"><button className="view-slides">VIEW SLIDES</button></Link>
                                <button onClick={handleDashboardClick} className="udbutton">DASHBOARD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;