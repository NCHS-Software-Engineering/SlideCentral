import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';


function DComponentActivities() {
    const [activities, setActivities] = useState([]);
    const [activityID, setActivityID] = useState([]);
    const [showNoActivitiesMessage, setShowNoActivitiesMessage] = useState(true);
    const location = useLocation();
    
    const handleLeaveClick = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this activity?');
        if (confirmation) {
          const activityName = window.prompt('Please enter the name of the activity to confirm deletion:');
          if (activityName === activities[index]) {
            axios.delete(`http://localhost:5000/sponsor2/?activityId=${activityID[index]}&userId=${sessionStorage.getItem("userId")}`)
            .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
            const newActivities = [...activities];
            newActivities.splice(index, 1);
            setActivities(newActivities);
            const newActivityID = [...activityID];
            newActivityID.splice(index, 1);
            setActivityID(newActivityID);
          } else {
            window.alert('The name you entered does not match the name of the activity. The activity was not deleted.');
          }
        }
      };
      
      const handleSave = () => {
        axios.get('http://localhost:5000/sponsor/' + sessionStorage.getItem("userId"))
          .then((response) => {
            const activityIDs = response.data.activityIds; // Access activityIds key
            console.log('Activity ID saved successfully.');
            setActivityID([...activityID, ...activityIDs]);
            const activityNames = response.data.activityNames; // Access activityNames key
            console.log('Activity saved successfully.');
            setActivities([...activities, ...activityNames]);
          })
          .catch(err => {
            console.error('Error saving activity:', err);
          });
      }

  useEffect(() => {
    handleSave(); // Trigger handleSave when the component mounts
  }, []);

const onActivityClick = (event) => {
         const activityName = event.target.innerText.split(' Dashboard')[0];
         console.log(activityName);

       
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
                <div className="activity-item-buttons">
                  <button onClick={() => handleLeaveClick(index)} className="delete-button">Leave Activity</button>
                </div>
            </div>
        ))}
      </div>
      <div className="nothing-container">
        {showNoActivitiesMessage && activities.length === 0 && <p className="no-activities-message">You have no current activities, ask a teacher to invite you.</p>}
      </div>
      
        </div>
    );
}

export default DComponentActivities;