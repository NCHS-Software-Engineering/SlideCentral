import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';


function DComponentActivities() {
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [activities, setActivities] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const location = useLocation();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddClick = () => {
        setShowInput(true);
        setInputValue('');
        setEditIndex(null);
    };

    const handleEditClick = (index) => {
        setShowInput(true);
        setInputValue(activities[index]);
        setEditIndex(index);
    };
    
    const handleDeleteClick = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this activity?');
        if (confirmation) {
          const activityName = window.prompt('Please enter the name of the activity to confirm deletion:');
          if (activityName === activities[index]) {
            axios.delete(`http://localhost:5000/activ/`+sessionStorage.getItem("activityID"))
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
              axios.delete(`http://localhost:5000/sponser/`+sessionStorage.getItem("activityID"))
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
            const newActivities = [...activities];
            newActivities.splice(index, 1);
            setActivities(newActivities);
          } else {
            window.alert('The name you entered does not match the name of the activity. The activity was not deleted.');
          }
        }
      };
  const handleSave = () => {
    axios.get('http://localhost:5000/sponser/' + sessionStorage.getItem("userId"))
      .then((response) => {
        const activityNames = response.data.map(item => item.activity_name);
        console.log('Activity saved successfully.');
        setActivities([...activities, ...activityNames]);
      })
      .catch(err => {
        console.error('Error saving activity:', err);
      });

    setShowInput(false);
    setInputValue('');
    setEditIndex(null);
  }

  useEffect(() => {
    handleSave(); // Trigger handleSave when the component mounts
  }, []);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (!/^[a-zA-Z0-9- ]*$/.test(inputValue)) {
        window.alert('Invalid Club Name, please use letters, numbers, dashes or spaces');
        return;
    }
    if (inputValue.length < 3 || inputValue.length > 30) {
        window.alert('Activity name should be between 3 and 30 characters long');
        return;
    }
    if (editIndex !== null) {
        const newActivities = [...activities];
        newActivities[editIndex] = inputValue;
        setActivities(newActivities);
    } else {
        setActivities([...activities, inputValue]);
    }
    let newActivities;
  if (editIndex !== null) {
    newActivities = [...activities];
    newActivities[editIndex] = inputValue;
  } else {
    newActivities = [...activities, inputValue];
  }
  setActivities(newActivities);
  const activityID = inputValue.replace(/ /g, '').toLowerCase() + currentDateTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
  console.log(activityID);
  sessionStorage.setItem("activityID", activityID);
  const userId = sessionStorage.getItem("userId");
  console.log(userId);
  axios.post('http://localhost:5000/api/sponser', { sub4: activityID , sub5: userId})
  axios.post('http://localhost:5000/api/activ', { sub6: activityID , sub7: inputValue})
    setShowInput(false);
    };

  return (
    <div className="activities-container">
        {activities.map((activity, index) => (
            <div key={index} className="activity-item">
                <Link to={`${location.pathname}/${activity.replace(/\s/g, '-')}-dashboard`} className="activity-link"><span>{activity} Dashboard</span></Link>
                <button onClick={() => handleEditClick(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteClick(index)} className="delete-button">Delete</button>
            </div>
        ))}
        {activities.length === 0 && <p className="no-activities-message">You have no current activities, click below to add one.</p>}
        {activities.length < 3 && <button onClick={handleAddClick} className="add-activity-button">Add Activity</button>}
        {showInput && (
            <form onSubmit={handleInputSubmit} className="activity-form">
                <label className="activity-label">
                    Enter Activity Name Here:
                    <input type="text" value={inputValue} onChange={handleInputChange} className="activity-input" />
                </label>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        )}
    </div>
  );
}

export default DComponentActivities;