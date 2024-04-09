import React from 'react';
import styles from './slidecreation.module.css';

const SlideCreationHomePage = () => {
  const handleCreateSlide = () => {
    // Logic for creating a slide
    console.log('Create Slide button clicked');
  };

  const handleUploadSlide = () => {
    // Logic for uploading a slide
    console.log('Upload Slide button clicked');
  };

  return (
    <div className={styles.slideCreationHomePage}>
        <div className={styles.slideCreationContainer}>
            <div className = {styles.buttons}>
                <button className={styles.createButton} onClick={handleCreateSlide}>Create a Slide</button>
                <button className={styles.uploadButton} onClick={handleUploadSlide}>Upload a Slide</button>
            </div>
        </div>
    </div>
  );
};

export default SlideCreationHomePage;