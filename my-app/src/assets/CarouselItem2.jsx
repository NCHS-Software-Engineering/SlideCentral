import React from 'react'

export const SlideshowItem = ({ item }) => {
  return (
    <div className = "carousel-item">
        
        <div></div>
        <img className = "carousel-img" src = {item.icon} />
        
    </div>
  );
}
