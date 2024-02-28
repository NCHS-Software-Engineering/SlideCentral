import { Link } from "react-router-dom";
import styles from './SignIn.module.css';
import '../HomeScreen/Background.css';

import TeacherImg from '../Media/images/teacher.webp';
import StudentImg from '../Media/images/student.jpeg';

function SignIn () {
  return (
        <main>
            <div className={styles.signincontainer} >
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1>Are you using SlideCentral as a...</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.option}>
                            <img src={TeacherImg} alt="Teacher"/>
                            <Link to="/dashboard"><h3>Teacher / Coach / Sponsor</h3></Link>
                        </div>
                        <div className={styles.option}>
                            <img src={StudentImg} alt="Student"/>
                            <Link to="/dashboard"><h3>Student / Club Leader</h3></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;