import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';


function DComponentStudentActivities() {
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [activities, setActivities] = useState([]);
    const [showNoActivitiesMessage, setShowNoActivitiesMessage] = useState(true);
    const location = useLocation();

    const onActivityClick = (event) => {
      const activityName = event.target.innerText.split(' ')[0];
      
     
        axios.get('http://localhost:5000/getID/' + activityName)
          .then((response) => {
            const activityID = response.data[0].activity_id;
            console.log(activityID);
            sessionStorage.setItem("currentActivityID", activityID);
          })
          .catch(err => {
            console.error('Error getting Activity ID:', err);
  });
};



  return (
    <div className="activities-container">
      <div className="smaller-activity-container">
        {activities.map((activity, index) => (
            <div key={index} className="activity-item">
                <Link to={`${location.pathname}/${activity.replace(/\s/g, '-')}-dashboard`} className="activity-link" onClick={onActivityClick}><span>{activity} Dashboard</span></Link>
            </div>
        ))}
      </div>
      <div className="nothing-container">
        {showNoActivitiesMessage && activities.length === 0 && <p className="no-activities-message">You have no current activities, ask a teacher to invite you!</p>}
    </div>
  </div>
    );
}

export default DComponentStudentActivities;