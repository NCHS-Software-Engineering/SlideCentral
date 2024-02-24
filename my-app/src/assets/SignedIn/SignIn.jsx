import { Link } from "react-router-dom";
import styles from './SignIn.module.css';
import '../Background.css';

import TeacherImg from '../Media/images/teacher.webp';
import StudentImg from '../Media/images/student.jpeg';
import NavLogo from '../Media/images/sclogo1.png';

function SignIn () {
  return (
        <main>
            <Link to="../"><img src={NavLogo} alt="Slide Central Logo" className={styles.navLogo}/></Link>

            <div className={styles.signincontainer}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1>Are you using SlideCentral as a...</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.option}>
                            <img src={TeacherImg} alt="Teacher"/>
                            <a href="teacherside/teacherdashboard.html"><h3>Teacher / Coach / Sponsor</h3></a>
                        </div>
                        <div className={styles.option}>
                            <img src={StudentImg} alt="Student"/>
                            <a href="studentside/studentdashboard.html"><h3>Student / Club Leader</h3></a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;