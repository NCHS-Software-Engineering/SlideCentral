import React from 'react'

export const CarouselItem = ({ item }) => {
  return (
    <div className = "carousel-item">
        
        <div></div>
        <img className = "carousel-img" src = {item.icon} />
        <div className = "carousel=item-text">{item.description}</div>
        
    </div>
  );
}
