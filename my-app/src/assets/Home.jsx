import LargeSlideCentralLogo from './Media/images/sslogonobg1.png';
import './Style.css';
import './Background.css';


function Home() {
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
                    <a href = "signedin/signin.html"><button id="signIn" className="google-sign-in">Sign in with Google</button></a>
                    <button id="viewSlides" className="view-slides">VIEW SLIDES</button>
                </div>
            </section>
        </main>
    )
}

export default Home;