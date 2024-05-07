import { useState, useEffect } from 'react';
import SlidesComponent from "./SlidesComponent";
import { useParams } from 'react-router-dom';
import InviteStudents from './InviteStudents';
import styles from './activitydashboard.module.css';


  
function ActivityDashboard() {
    const { activityID } = useParams();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Get the user type from the session storage when the component mounts
        const userType = sessionStorage.getItem('userType');
        setUserType(userType);
    }, []);
    
    return (
        <main className={styles.activityDashboardMainContent}>
            <div className={styles.activityDashboard}>
                <SlidesComponent activityID={activityID}/>
                {console.log("it is" + activityID)}
                {userType === 'teacher' && <InviteStudents/>}
            </div>
        </main>
    )
}

export default ActivityDashboard;