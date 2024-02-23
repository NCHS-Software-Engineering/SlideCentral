
import './Style.css';
import './Background.css';


function Information() {
    return (
        <main>
            <div class="info-content-container">
                <section class="information-section">
                <h2>Accounts</h2>
                <p>SlideCentral's account system is linked to your Naperville 203 issued email’s Google account, which can identify if you are a student or teacher, and gives you access to your sponsored clubs, activities, and sports.</p>

                <h2>Student Applications</h2>
                <p>Once a teacher creates an account and starts a club, they can invite students in the club to manipulate slides / club information without the use of a teacher.</p>

                <h2>What Do My Slides Do?</h2>
                <p>Your slides from each club will be displayed on hall monitors either consecutively or at random times for 30 seconds total. Slides are meant to be a combination of flashy and informational in order for more students to stop and look and think about joining the club or activity.</p>
                </section>

                <aside class="capabilities-section">
                <h2>Slide Capabilities</h2>
                <p>Each account is allotted up to five different clubs with a maximum of three slides per club. The slides that are picked for a club will take up 30 total seconds, so if only one slide is displayed, it will be shown for 30 seconds, however if there are three, the displayed time will be default 10 seconds each to make 30 seconds total, but each individual time can be manipulated for further customization.</p>

                <h2>Creating a Slide</h2>
                <p>Creating a slide can be as complicated or as simple as you would like it to be. By inputting simple information, a couple different slide options will automatically be created, and can be used as a template for further customization.</p>

                <h2>Slide Carousel</h2>
                <p>After each club's inputted date has passed, the slide will automatically be removed from the carousel, however will still be saved in your account if you would like to reuse it as a template for another club.</p>
                </aside>
            </div>
        </main>
    )
}

export default Information;