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
        
        <div>
        <form className="slide-form">
              <div>
                <label className="slide-label">
                    Enter Activity Name Here:
                    <input type="text" className="slide-title-input" />
                </label>
              </div>
              <div>
                <label className="slide-label">
                    Enter Activity Description Here:
                    <textarea className="slide-content-input" />
                </label>
              </div>
                <button className={styles.createButton} onClick={handleCreateSlide}>Create</button>

                
        </form>
        </div>
    </div>
  );
};

export default SlideCreationHomePage;