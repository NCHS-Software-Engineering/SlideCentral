import React, { useState } from 'react';
import styles from './activitydashboard.module.css';
import { Link } from 'react-router-dom';

const SlidesComponent = () => {
  const [slides, setSlides] = useState([]);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);

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
        {slides.length === 0 ? (
          <p>- None</p>
        ) : (
          slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <img src={slide.imageUrl} alt={`Slide ${index + 1}`} />
              <p>Expires {slide.expiryDate}</p>
              <button
                className={styles.removeButton}
                onClick={() => handleDeleteSlide(index)}
              >
                REMOVE
              </button>
            </div>
          ))
        )}
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