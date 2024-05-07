import React, { useState } from 'react';
import styles from './activitydashboard.module.css';
import { Link } from 'react-router-dom';
import MiniCarousel from './miniCarousel';
import { useEffect } from 'react';

const SlidesComponent = () => {
  const [slides, setSlides] = useState([]);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);


  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarouselReady(true);
    }, 500);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);
  
  const handleAddSlide = () => {
    // Logic to add a new slide
  };
  const { activityID } = sessionStorage.getItem('currentActivityID');

  const handleDeleteSlide = (index) => {
    setIsConfirmingDelete(index);
  };

  const confirmDelete = () => {
    setSlides(slides.filter((_, i) => i !== isConfirmingDelete));
    setIsConfirmingDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(null);
  };

  return (
    <div className={styles.slidesComponent}>
      <div className={styles.currentSlides}>
        <h2>CURRENT SLIDES:</h2>
        {isCarouselReady && <MiniCarousel/>}
      </div>
      {slides.length < 3 && (
        <Link to="./slide-creation">
            <button className={styles.addButton} onClick={handleAddSlide}>
            + Add a slide
            </button>
        </Link>
      )}
      {slides.length === 3 && <p>You have reached the maximum number of slides for this activity.</p>}
      
      {isConfirmingDelete !== null && (
        <div className={styles.confirmationDialog}>
          <p>Are you sure you want to delete this slide?</p>
          <button className={styles.confirmButton} onClick={confirmDelete}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SlidesComponent;