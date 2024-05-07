import React from 'react'
import './Carousel.css';

export const CarouselItem = ({ item, isFullScreen }) => {
  return (
    <div className={`carousel-item ${isFullScreen ? 'fullscreen' : ''}`}>
        
        <div></div>
        <img className = "carousel-img" src = {item} />
        
    </div>
  );
}