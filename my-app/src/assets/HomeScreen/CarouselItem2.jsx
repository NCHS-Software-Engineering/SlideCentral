import React from 'react'
import './Carousel.css';

export const CarouselItem = ({ width, isFullScreen }) => {
  return (
    <div className={`carousel-item ${isFullScreen ? 'fullscreen' : ''} ` } style={{ width: width }}>
        <div className="carousel-item-content">
            <h2>SlideCetnral</h2>
            <p>We meet every monday</p>

        {/* <img className = "carousel-img" src = {item.icon} /> */}
        </div>
    </div>
  );
}
