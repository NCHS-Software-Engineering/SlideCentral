
import styles from './slidecreation.module.css';
import moment from 'moment';
import axios from 'axios';
import Upload from '../../HomeScreen/Upload.jsx';
import React, { useState, useEffect } from 'react';


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
    

    axios.post('http://localhost:5000/api/slide', { sub1: slideID , sub2: titleInput, sub3: descriptionInput, sub4: dateInput, sub5: sessionStorage.getItem("currentActivityID") })


  };




  const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };



  const handleUploadSlide = e => {
    // Logic for uploading a slide
    e.preventDefault();

    if (!selectedFile) {
        alert('No file selected for upload.');
        return;
    }

    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png'     && selectedFile.type !== 'image/jpg') {
        alert('Only image files can be uploaded.');
        return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Image uploaded successfully!');
            const image1Path = response.path;
        } else {
            alert('Failed to upload image.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };
 
  

  return (
    <div className={styles.slideCreationHomePage}>
        
        <div>
        
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

              <input type="file" name="image" id="imageInput" accept="image/*" onChange={onSelectFile} />
                {selectedFile &&  <img id="output" src={preview} />}
              <button onClick={handleUploadSlide} className={styles.uploadButton}>Upload</button>

              
              <button onClick ={handleCreateSlide} className={styles.createButton}>Create</button>

               
        
        </div>
    </div>
  );
};

export default SlideCreationHomePage;