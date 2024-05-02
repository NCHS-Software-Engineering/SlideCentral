import styles from './slidecreation.module.css';
import moment from 'moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');




const SlideCreationHomePage = () => {

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [imagePath1, setImagePath1] = useState(null);
  const [imagePath2, setImagePath2] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); 
  const [textColor, setTextColor] = useState('#000000');
  const [creationMethod, setCreationMethod] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [preview, setPreview] = useState();
  const [preview2, setPreview2] = useState();


  // SlideTitleStep Component
  const SlideTitleStep = ({ titleInput, handleTitleChange }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Slide Title</div>
      <input 
        value={titleInput} 
        onChange={handleTitleChange} 
        type="text" 
        className={styles.slideTitleInput}
        placeholder="Enter Slide Title Here" 
      />
    </div>
  );

  // DescriptionStep Component
  const DescriptionStep = ({ descriptionInput, handleDescriptionChange }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Activity Description / Message</div>
      <textarea 
        value={descriptionInput} 
        onChange={handleDescriptionChange} 
        className={styles.slideTitleInput}
        placeholder="Enter Activity Description Here" 
      />
    </div>
  );

  // EventDateStep Component
  const EventDateStep = ({ dateInput, handleDateChange }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Event Date</div>
      <input 
        value={dateInput} 
        onChange={handleDateChange} 
        type="date" 
        className={styles.slideTitleInput}
      />
    </div>
  );

  // UploadImageStep Component
  const UploadImageStep = ({ selectedFile, setSelectedFile, preview, handleUploadSlide, imageKey }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Import Image</div>
      <input 
        key={selectedFile ? 'uploaded' : 'not-uploaded'}
        type="file" 
        name="image" 
        id={`imageInput-${imageKey}`} 
        accept="image/*" 
        onChange={e => setSelectedFile(e.target.files[0])}
      />
      {selectedFile && <img src={preview} className={styles.imagePreview} />}
      <button onClick={handleUploadSlide} className={styles.uploadButton}>Upload</button>
    </div>
  );

  const UploadImageStep2 = ({ selectedFile2, setSelectedFile2, preview2, handleUploadSlide2, imageKey2 }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Import Image 2 (optional)</div>
      <input 
        key={selectedFile2 ? 'uploaded' : 'not-uploaded'}
        type="file" 
        name="image" 
        id={`imageInput-${imageKey2}`} 
        accept="image/*" 
        onChange={e => setSelectedFile2(e.target.files[0])}
      />
      {selectedFile && <img src={preview2} className={styles.imagePreview} />}
      <button onClick={handleUploadSlide2} className={styles.uploadButton}>Upload</button>
    </div>
  );

  // BackgroundColorStep Component
  const BackgroundColorStep = ({ backgroundColor, setBackgroundColor }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Background Color</div>
      <input
        type="color"
        className={styles.colorInput}
        value={backgroundColor}
        onChange={e => setBackgroundColor(e.target.value)}
      />
    </div>
  );

  // TextColorStep Component
  const TextColorStep = ({ textColor, setTextColor }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Text Color</div>
      <input
        type="color"
        className={styles.colorInput}
        value={textColor}
        onChange={e => setTextColor(e.target.value)}
      />
    </div>
  );

  // CreateSlideStep Component
  const CreateSlideStep = ({ handleCreateSlide }) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>Create Slide Templates!</div>
      <button className={styles.createButton} onClick={handleCreateSlide}>
        Create Slide
      </button>
    </div>
  );



  const handleMethodSelection = (method) => {
    setCreationMethod(method);
    setCurrentStep(1); 
  };

  const totalSteps = creationMethod === 'form' ? 8 : 3;

  const renderInitialQuestion = () => (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>How would you like to create a slide?</div>
      <div className={styles.initialQuestionButtons}>
        <button onClick={() => handleMethodSelection('form')} className={styles.optionButton}>Generate with Form</button>
        <button onClick={() => handleMethodSelection('image')} className={styles.optionButton}>Upload Slide Image</button>
      </div>
    </div>
  );

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
    console.log('Create Slide button clicked');
    const slideID = titleInput.replace(/ /g, '').toLowerCase() + currentDateTime.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '');
    axios.post('http://localhost:5000/api/slide', { sub1: slideID , sub2: titleInput, sub3: descriptionInput, sub4: dateInput, sub5: sessionStorage.getItem("currentActivityID"), sub6: imagePath1, sub7: imagePath2, sub8: backgroundColor, sub9: textColor })
  };

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
    if (!selectedFile) {
      alert('No file selected for upload.');
      return;
    }
  
    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpg') {
      alert('Only image files can be uploaded.');
      return;
    }
  
    const formData1 = new FormData();
    formData1.append('image', selectedFile);
  
    try {
      const response1 = await axios.post('http://localhost:5000/upload', formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response1.status === 200) {
        alert('Image 1 uploaded successfully!');
        setImagePath1(response1.data.imagePath);
        setKey1(Date.now());
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUploadSlide2 = async e => {
    e.preventDefault();
    if (!selectedFile2) {
      alert('No file selected for upload.');
      return;
    }
  
    if (selectedFile2.type !== 'image/jpeg' && selectedFile2.type !== 'image/png' && selectedFile2.type !== 'image/jpg') {
      alert('Only image files can be uploaded.');
      return;
    }
  
    const formData2 = new FormData();
    formData2.append('image', selectedFile2);
  
    try {
      const response2 = await axios.post('http://localhost:5000/upload', formData2, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response2.status === 200) {
        alert('Image 2 uploaded successfully!');
        setImagePath2(response2.data.imagePath);
        setKey2(Date.now());
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
      if (event.key === 'ArrowRight' || event.key === 'Enter' && currentStep > 0) {
        goNext();
      } else if (event.key === 'ArrowLeft' && currentStep > 1) {
        goBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, creationMethod]);


  const renderStepContent = () => {
    if (currentStep === 0) return renderInitialQuestion();

    if (creationMethod === 'form') {
      return renderFormSteps();
    } else if (creationMethod === 'image') {
      return renderImageUploadSteps();
    }
  };

  const renderFormSteps = () => {
    switch (currentStep) {
      case 1:
        return <SlideTitleStep titleInput = {titleInput} handleTitleChange = {handleTitleChange}/>;
      case 2:
        return <DescriptionStep descriptionInput = {descriptionInput} handleDescriptionChange = {handleDescriptionChange}/>;
      case 3:
        return <EventDateStep dateInput = {dateInput} handleDateChange = {handleDateChange}/>;
      case 4:
        return <UploadImageStep selectedFile = {selectedFile} setSelectedFile = {setSelectedFile} preview = {preview} handleUploadSlide = {handleUploadSlide} imageKey='image1' />;
      case 5:
        return <UploadImageStep2 selectedFile2 = {selectedFile2} setSelectedFile2 = {setSelectedFile2} preview2 = {preview2} handleUploadSlide = {handleUploadSlide} imageKey='image2' />;
      case 6:
        return <BackgroundColorStep backgroundColor = {backgroundColor} setBackgroundColor = {setBackgroundColor}/>;
      case 7:
        return <TextColorStep textColor = {textColor} setTextColor = {setTextColor}/>;
      case 8:
        return <CreateSlideStep handleCreateSlide = {handleCreateSlide}/>;
      default:
        return null;
    }
  };

  const renderImageUploadSteps = () => {
    switch (currentStep) {
      case 1:
        return <EventDateStep dateInput = {dateInput} handleDateChange = {handleDateChange}/>;
      case 2:
        return <UploadImageStep selectedFile = {selectedFile} setSelectedFile = {setSelectedFile} preview = {preview} handleUploadSlide = {handleUploadSlide} imageKey='image1' />;
      case 3:
        return <CreateSlideStep handleCreateSlide = {handleCreateSlide}/>;
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
            onClick={goBack}
            disabled={currentStep <= 1}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button 
            onClick={goNext}
            disabled={currentStep >= totalSteps || currentStep === 0}
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
        {currentStep > 0 && (
          <div className={styles.stepCounter}>
            <p>Step {currentStep} of {totalSteps}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideCreationHomePage;