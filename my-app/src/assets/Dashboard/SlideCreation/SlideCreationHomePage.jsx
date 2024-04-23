import React from 'react';
import styles from './slidecreation.module.css';
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';

const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

const SlideCreationHomePage = () => {

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
};
const handleDescriptionChange = (event) => {
  setDescriptionInput(event.target.value);
};
const handleDateChange = (event) => {
  setDateInput(event.target.value);
};

  const handleCreateSlide = () => {
    // Logic for creating a slide
    console.log('Create Slide button clicked');

    const slideID = titleInput.replace(/ /g, '').toLowerCase() + currentDateTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
    

    axios.post('http://localhost:5000/api/slide', { sub1: slideID , sub2: titleInput, sub3: descriptionInput, sub4: dateInput })


  };

  const handleUploadSlide = () => {
    // Logic for uploading a slide
    console.log('Upload Slide button clicked');
  };
 
  

  return (
    <div className={styles.slideCreationHomePage}>
        
        <div>
        <form onSubmit ={handleCreateSlide} className="slide-form">
              <div>
                <label className="slide-title">
                    Enter Slide Title Here:
                    <input value={titleInput} onChange = {handleTitleChange} type="text" className="slide-title-input" />
                </label>
              </div>
              <div>
                <label className="slide-description">
                    Enter Activity Description Here:
                    <textarea value={descriptionInput} onChange = {handleDescriptionChange} className="slide-description-input" />
                </label>
              </div>
              <div>
                <label className="slide-date">
                    Enter Activity Meeting Date Here:
                    <input value={dateInput} onChange = {handleDateChange} className="slide-date-input" />
                </label>
              </div>
                <button className={styles.createButton}>Create</button>

                
        </form>
        </div>
    </div>
  );
};

export default SlideCreationHomePage;