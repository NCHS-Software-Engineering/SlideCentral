
import styles from './slidecreation.module.css';
import moment from 'moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

const SlideCreationHomePage = () => {

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [imagePath2, setImagePath2] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // total number of steps in the form
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); 
  const [textColor, setTextColor] = useState('#000000'); 

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
    

    axios.post('http://localhost:5000/api/slide', { sub1: slideID , sub2: titleInput, sub3: descriptionInput, sub4: dateInput, sub5: sessionStorage.getItem("currentActivityID"), sub6: imagePath, sub7:backgroundColor, sub8: textColor })


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

        let imagePath = response.data;
        imagePath = imagePath.replace(/\\/g, '/'); // Add this line
        const baseIndex = imagePath.indexOf('SlideCentral');
        if (baseIndex > -1) {
            imagePath = imagePath.substring(baseIndex);
        }
        setImagePath(imagePath);
        
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle arrow key press to navigate the form
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goNext();
      } else if (event.key === 'ArrowLeft') {
        goBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>1. Slide Title</div>
            <input 
              value={titleInput} 
              onChange={handleTitleChange} 
              type="text" 
              className={styles.slideTitleInput}
              placeholder="Enter Slide Title Here" 
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>2. Activity Description / Message</div>
            <textarea 
              value={descriptionInput} 
              onChange={handleDescriptionChange} 
              className={styles.slideTitleInput}
              placeholder="Enter Activity Description Here" 
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>3. Event Date</div>
            <input 
              value={dateInput} 
              onChange={handleDateChange} 
              type="date" 
              className={styles.slideTitleInput}
            />
          </div>
        );
      case 4:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>4. Import Image 1</div>
            <input 
              type="file" 
              name="image" 
              id="imageInput" 
              accept="image/*" 
              onChange={onSelectFile}
            />
            {selectedFile && <img id="output" src={preview} className={styles.imagePreview} />}
            <button onClick={handleUploadSlide} className={styles.uploadButton}>Upload</button>
          </div>
        );
      case 5:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>5. Import Image 2</div>
            <input
              type="file"
              name="image2"
              accept="image/*"
            />
            {/* Display the second image preview if available */}
            {imagePath2 && <img src={imagePath2} className={styles.imagePreview} />}
          </div>
        );
      case 6:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>6. Background Color</div>
            <input
              type="color"
              className={styles.colorInput}
              value = {backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)} // Update backgroundColor when the user selects a color
            />
          </div>
        );
      case 7:
        return (
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>7. Text Color</div>
            <input
              type="color"
              className={styles.colorInput}
              value = {textColor}
              onChange={(event) => setTextColor(event.target.value)} // Update textColor when the user selects a color
            />
          </div>
        );
      case 8:
        return (
          <div className={styles.inputContainer}>
            <button className={styles.createButton} onClick = {handleCreateSlide}>
              Create Slide
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.slideCreationHomePage}>
      <div className={styles.slideCreationContainer}>
        {renderStepContent()}
        <div className={styles.navigationButtons}>
          <button 
            onClick={currentStep > 1 ? goBack : undefined}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            disabled={currentStep === 1} // Disables button on first step
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button 
            onClick={currentStep < totalSteps ? goNext : undefined}
            className={`${styles.navButton} ${styles.navButtonRight}`}
            disabled={currentStep === totalSteps} // Disables button on last step
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideCreationHomePage;