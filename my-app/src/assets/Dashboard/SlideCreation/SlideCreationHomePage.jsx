
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
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [preview, setPreview] = useState();
  const [preview2, setPreview2] = useState();

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
  
  const onSelectFile2 = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile2(undefined);
          return;
      }
  
      setSelectedFile2(e.target.files[0]);
  };

    useEffect(() => {
      if (!selectedFile2) {
          setPreview2(undefined);
          return;
      }
  
      const objectUrl2 = URL.createObjectURL(selectedFile2);
      setPreview2(objectUrl2);
  
      return () => URL.revokeObjectURL(objectUrl2);
  }, [selectedFile2]);



  const [key1, setKey1] = useState(Date.now());
  const [key2, setKey2] = useState(Date.now());

  const handleUploadSlide = async e => {
    e.preventDefault();
  
    if (!selectedFile || !selectedFile2) {
      alert('No file selected for upload.');
      return;
    }
  
    if (
      (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpg') ||
      (selectedFile2.type !== 'image/jpeg' && selectedFile2.type !== 'image/png' && selectedFile2.type !== 'image/jpg')
    ) {
      alert('Only image files can be uploaded.');
      return;
    }
  
    const formData1 = new FormData();
    formData1.append('image', selectedFile);
  
    const formData2 = new FormData();
    formData2.append('image', selectedFile2);
  
    try {
      const response1 = await axios.post('http://localhost:5000/upload', formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const response2 = await axios.post('http://localhost:5000/upload', formData2, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response1.status === 200 && response2.status === 200) {
        alert('Images uploaded successfully!');
        setKey1(Date.now());
        setKey2(Date.now());

  
        let imagePath1 = response1.data;
        imagePath1 = imagePath1.replace(/\\/g, '/');
        const baseIndex1 = imagePath1.indexOf('SlideCentral');
        if (baseIndex1 > -1) {
          imagePath1 = imagePath1.substring(baseIndex1);
        }
  
        let imagePath2 = response2.data;
        imagePath2 = imagePath2.replace(/\\/g, '/');
        const baseIndex2 = imagePath2.indexOf('SlideCentral');
        if (baseIndex2 > -1) {
          imagePath2 = imagePath2.substring(baseIndex2);
        }
      }
    } catch (error) {
      console.error(error);
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
              key={key1}
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
              key={key2}
              type="file"
              name="image2"
              accept="image/*"
              onChange={onSelectFile2}
            />
            {/* Display the second image preview if available */}
            {selectedFile2 && <img id="output" src={preview2} className={styles.imagePreview} />}
            <button onClick={handleUploadSlide} className={styles.uploadButton}>Upload</button>
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
            <div className={styles.inputTitle}>8. Create Slide Templates!</div>
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
        <div className={styles.stepCounter}>
          <p>Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideCreationHomePage;