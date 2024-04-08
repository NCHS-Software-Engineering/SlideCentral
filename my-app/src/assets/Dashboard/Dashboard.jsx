import { useState, useEffect } from 'react';
import DComponentActivities from "./DComponentActivities";
import DComponentStudentActivities from "./DComponentStudentActivities";
import DComponentNotifications from "./DComponentNotifications";
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Get the user type from the session storage when the component mounts
        const userType = sessionStorage.getItem('userType');
        setUserType(userType);
    }, []);

    return (
        <main className="dashboard-main-content">
            <div className="dashboard">
                {userType === 'teacher' && <DComponentActivities/>}
                {userType === 'student' && <DComponentStudentActivities />}
                <DComponentNotifications />
            </div>

            
        </main>

        
    )


}

export default Dashboard;