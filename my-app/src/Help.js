import React from 'react'

export const Help = () => {
  return (
    <div>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Help</title>
            <link rel="stylesheet" href="style.css"/>
            <link rel="stylesheet" href="background.css"/>
        </head>

            <body>
            <header>
            <nav>
                <ul>
                <li><a href="index.html"><img src="images/sclogo1.png" alt="Slide Central Logo" class="nav-logo"/></a></li>
                
                <li><a href="index.html" class="wordlinks">Home</a></li>
                <li><a href="#" class="wordlinks">Slideshow</a></li>
                <li><a href="help.html" class="wordlinks">Help</a></li>
                <li><a href="information.html" class="wordlinks">Information</a></li>
                </ul>
            </nav>
            </header>

            <main>
            <div class="help-content-container">
                <section class="feedback-section">
                <h2>Report a Bug:</h2>
                <p>Email us a screenshot or explanation of a bug or issue with the system!</p>

                <h2>Request a Change:</h2>
                <p>Have a feature you would like to be a part of SlideCentral? Feel free to contact us to explain the requested change and why it should be implemented!</p>

                <h2>Give Feedback:</h2>
                <p>Have feedback on the app that you would like to share with the developers? Email us</p>
                </section>
                
                <aside class="contact-section">
                <h2>Our Contacts:</h2>
                <div class="contact-info">
                    <h3>Connor Furby:</h3>
                    <p>Phone: (773)-202-LUNA</p>
                    <p>Email: cfurby@stunaperville203.org</p>
                </div>
                <div class="contact-info">
                    <h3>Preston Probst:</h3>
                    <p>Phone: (773)-202-LUNA</p>
                    <p>Email: pprobst@stunaperville203.org</p>
                </div>
                <div class="contact-info">
                    <h3>Shreyas Yerabati:</h3>
                    <p>Phone: (773)-202-LUNA</p>
                    <p>Email: syerabati@stunaperville203.org</p>
                </div>
                <div class="contact-info">
                    <h3>Dylan Kosloski:</h3>
                    <p>Phone: (773)-202-LUNA</p>
                    <p>Email: dkosloski@stunaperville203.org</p>
                </div>
                </aside>
            </div>
            </main>

            <footer>
            <p>Created by Connor Furby, Shreyas Yerabati, Preston Probst, and Dylan Kosloski</p>
            </footer>
            
            <script src="script.js"></script>
            </body>




    </div>
  )
}
