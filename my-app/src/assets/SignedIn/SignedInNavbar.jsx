import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import NavLogo from '../Media/images/sclogo1.png';
import styles from './SignIn.module.css';

function SignedInNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Function to convert string to title case and replace dashes with spaces
    const toTitleCase = (str) => {
        return str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logoAndLinks}>
                <Link to="../"><img src={NavLogo} alt="Slide Central Logo" className={styles.navLogo}/></Link>
                <div className={styles.breadcrumb}>
                    {pathnames.length > 0 ? (
                        pathnames.slice(1).map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 2).join("/")}`;

                            return (
                                <span key={index}>
                                    <NavLink exact to={to} className={styles.breadcrumbItem} activeClassName={styles.active}>{toTitleCase(value)}</NavLink>
                                    {index < pathnames.length - 2 && <span className={styles.arrow}>→</span>}
                                </span>
                            );
                        })
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default SignedInNavbar;