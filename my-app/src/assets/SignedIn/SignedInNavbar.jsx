import { Link } from "react-router-dom";
import NavLogo from '../Media/images/sclogo1.png';
import styles from './SignIn.module.css';

function SignedInNavbar() {
    return (
        <div>
            <Link to="../"><img src={NavLogo} alt="Slide Central Logo" className={styles.navLogo}/></Link>
        </div>
    )
}
export default SignedInNavbar;