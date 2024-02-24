import './Style.css';
import './Background.css';

function Help() {
    return (
        <main>
            <div className="help-content-container">
                <section className="feedback-section">
                    <h2>Report a Bug:</h2>
                    <p>Email us a screenshot or explanation of a bug or issue with the system!</p>

                    <h2>Request a Change:</h2>
                    <p>Have a feature you would like to be a part of SlideCentral? Feel free to contact us to explain the requested change and why it should be implemented!</p>

                    <h2>Give Feedback:</h2>
                    <p>Have feedback on the app that you would like to share with the developers? Email us</p>
                </section>
                
                <aside className="contact-section">
                    <h2>Our Contacts:</h2>
                    <div className="contact-info">
                        <h3>Connor Furby:</h3>
                        <p>Email: cfurby@stunaperville203.org</p>
                    </div>
                    <div className="contact-info">
                        <h3>Preston Probst:</h3>
                        <p>Email: pprobst@stunaperville203.org</p>
                    </div>
                    <div className="contact-info">
                        <h3>Shreyas Yerabati:</h3>
                        <p>Email: syerabati@stunaperville203.org</p>
                    </div>
                    <div className="contact-info">
                        <h3>Dylan Kosloski:</h3>
                        <p>Email: dkosloski@stunaperville203.org</p>
                    </div>
                </aside>
            </div>
        </main>
    );
}

export default Help;