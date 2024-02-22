import React from 'react'
import { Link } from "react-router-dom"; 
import './Style.css'
import './Background.css'

export const Home = () => {
  return (
    <div>



<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Slide Central</title>
  <link rel="stylesheet" href="Style.css"/>
  <link rel="stylesheet" href="Background.css"/>
</head>
  
<body>
<header>
  <nav>
    <ul>
      <li><a href="/"><img src="images/sclogo1.png" alt="Slide Central Logo" class="nav-logo"/></a></li>

      <li><a href="/" class="wordlinks">Home</a></li>
      <li><a href="#" class="wordlinks">Slideshow</a></li>
      <li><a href="/help" class="wordlinks">Help</a></li>
      <li><a href="/information" class="wordlinks">Information</a></li>
    </ul>
  </nav>
</header>

<main>
  <div class="welcome">
    <div class="welcome-text">
      <h1>Welcome to <span class="scund">SLIDECENTRAL</span></h1>
      <p> An app built for Naperville Central students and teachers looking to boost awareness for clubs, activities, and sports. </p>
    </div>
    <img src="images/sslogonobg1.png" alt="Large Slide Central Logo" class="large-logo"/>
  </div>

  <section class="get-started">
    <div class="get-started-content">
      <h2>GET STARTED</h2>
      <p>It's really easy to make a slide for your club, activity, sport, or event! Simply sign in with your student or teacher Google account below to get started.</p>
      <a href = "signedin/signin.html"><button id="signIn" class="google-sign-in">Sign in with Google</button></a>
      <button id="viewSlides" class="view-slides">VIEW SLIDES</button>
    </div>
  </section>
</main>

<footer>
  <p>Created by Connor Furby, Shreyas Yerabati, Preston Probst, and Dylan Kosloski</p>
</footer>
</body>

  

    </div>
  )
}


export default Home;