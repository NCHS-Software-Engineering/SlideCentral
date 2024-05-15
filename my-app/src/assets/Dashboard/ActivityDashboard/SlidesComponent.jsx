import React, { useState } from 'react';
import styles from './activitydashboard.module.css';
import { Link } from 'react-router-dom';
import MiniCarousel from './miniCarousel';
import { useEffect } from 'react';
import axios from 'axios';


const SlidesComponent = () => {
  const [slides, setSlides] = useState([]);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);


  const [isCarouselReady, setIsCarouselReady] = useState(false);
  const [slidesReady, setSlidesReady] = useState(true);
  const activityID = sessionStorage.getItem('currentActivityID');



  useEffect(() => {


    axios.get(`http://localhost:5000/numSlides${activityID}`)
          .then(response => {
            const numSlides = response.data.numSlides;
            if (numSlides === 0) {
              setSlidesReady(false);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarouselReady(true);
    }, 300);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);
  
  const handleAddSlide = () => {
    // Logic to add a new slide
  };
  

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
        { slidesReady && isCarouselReady ? <MiniCarousel/> : <p>NO SLIDES</p>}
      </div>
      {slides.length < 10 && (
        <Link to="./slide-creation">
            <button className={styles.addButton} onClick={handleAddSlide}>
            + Add a slide
            </button>
        </Link>
      )}
      {slides.length === 10 && <p>You have reached the maximum number of slides for this activity.</p>}
      
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