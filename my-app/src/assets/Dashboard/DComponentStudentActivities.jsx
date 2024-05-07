import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';


function DComponentActivities() {
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [activities, setActivities] = useState([]);
    const [activityID, setActivityID] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showNoActivitiesMessage, setShowNoActivitiesMessage] = useState(true);
    const location = useLocation();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddClick = () => {
      setShowInput(true);
      setInputValue('');
      setEditIndex(null);
      setShowNoActivitiesMessage(false);
    };

    const handleEditClick = (index) => {
        setShowInput(true);
        setInputValue(activities[index]);
        setEditIndex(index);
    };

    const handleCancelClick = () => {
      setShowInput(false);
      if (activities.length === 0) {
          setShowNoActivitiesMessage(true);
      }
    };
    
    const handleDeleteClick = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this activity?');
        if (confirmation) {
          const activityName = window.prompt('Please enter the name of the activity to confirm deletion:');
          if (activityName === activities[index]) {
            axios.delete(`http://localhost:5000/activ/`+ activityID[index])
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
              axios.delete(`http://localhost:5000/sponsor/`+ activityID[index])
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
        setShowInput(false);
        setInputValue('');
        setEditIndex(null);
      }

  useEffect(() => {
    handleSave(); // Trigger handleSave when the component mounts
  }, []);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    const aID = inputValue.replace(/ /g, '').toLowerCase() + currentDateTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
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
        const newActivityID = [...activityID];
        newActivityID[editIndex] = aID;
        setActivityID(newActivityID);
        axios.delete(`http://localhost:5000/activ/`+ activityID[editIndex])
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
              axios.delete(`http://localhost:5000/sponsor/`+ activityID[editIndex])
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
    } else {
        setActivities([...activities, inputValue]);
        setActivityID([...activityID, aID]);
    }
    let newActivities;
    let newActivityID;
    if (editIndex !== null) {
      newActivities = [...activities];
      newActivities[editIndex] = inputValue;
      newActivityID = [...activityID];
      newActivityID[editIndex] = aID;
      axios.delete(`http://localhost:5000/activ/`+ activityID[editIndex])
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
              axios.delete(`http://localhost:5000/sponsor/`+ activityID[editIndex])
              .then(() => {
                console.log('Activity deleted successfully.');
              })
              .catch(err => {
                console.error('Error deleting activity:', err);
              });
    } else {
      newActivities = [...activities, inputValue];
      newActivityID = [...activityID, aID];
    }
    setActivities(newActivities);
    setActivityID(newActivityID);
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    axios.post('http://localhost:5000/api/sponsor', { sub4: aID , sub5: userId})
    axios.post('http://localhost:5000/api/activ', { sub6: aID , sub7: inputValue})
    setShowInput(false);
  };

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
                  <button onClick={() => handleEditClick(index)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteClick(index)} className="delete-button">Delete</button>
                </div>
            </div>
        ))}
      </div>
      
        </div>
    );
}

export default DComponentActivities;