import { Link } from 'react-router-dom';
import './Dashboard.css';

function DComponentStudentActivities() {
    
  return (
    <div className="activities-container">
        <h2>Student Activities</h2>
        <p>Here you can view and join activities that are available to you.</p>
        <div className="activities">
            <div className="activity">
            <h3>Activity 1</h3>
            <p>Activity 1 Description</p>
            <Link to="/dashboard/activity1">View Activity</Link>
            </div>
            <div className="activity">
            <h3>Activity 2</h3>
            <p>Activity 2 Description</p>
            <Link to="/dashboard/activity2">View Activity</Link>
            </div>
            <div className="activity">
            <h3>Activity 3</h3>
            <p>Activity 3 Description</p>
            <Link to="/dashboard/activity3">View Activity</Link>
            </div>
        </div>
    </div>
  );
}

export default DComponentStudentActivities;