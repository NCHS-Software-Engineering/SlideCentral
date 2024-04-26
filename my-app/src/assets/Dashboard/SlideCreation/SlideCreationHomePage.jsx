
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
  const [imagePath, setImagePath] = useState(null);

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
    

    axios.post('http://localhost:5000/api/slide', { sub1: slideID , sub2: titleInput, sub3: descriptionInput, sub4: dateInput, sub5: sessionStorage.getItem("currentActivityID"), sub6: imagePath })


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



  const handleUploadSlide = async e => {
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

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Image uploaded successfully!');
        setImagePath(response.data);
        console.log(response.data);
        
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  

  return (
    <div className={styles.slideCreationHomePage}>
      <div className={styles.slideCreationContainer}>
        <div className={styles.sl}>
          <label className={styles.slideTitle}>
            Enter Slide Title Here:
            <input value={titleInput} onChange={handleTitleChange} type="text" className={styles.slideTitleInput} />
          </label>
        </div>
        <div className={styles.slideDescriptionContainer}>
          <label className={styles.slideDescription}>
            Enter Activity Description Here:
            <textarea value={descriptionInput} onChange={handleDescriptionChange} className={styles.slideDescriptionInput} />
          </label>
        </div>
        <div className={styles.slideDateContainer}>
          <label className={styles.slideDate}>
            Enter Activity Meeting Date Here:
            <input value={dateInput} onChange={handleDateChange} className={styles.slideDateInput} />
          </label>
        </div>
        <input type="file" name="image" id="imageInput" accept="image/*" onChange={onSelectFile} />
        {selectedFile && <img id="output" src={preview} className={styles.imagePreview} />}
        <button onClick={handleUploadSlide} className={styles.uploadButton}>Upload</button>
        <button onClick={handleCreateSlide} className={styles.createButton}>Create</button>
      </div>
    </div>
  );
};

export default SlideCreationHomePage;