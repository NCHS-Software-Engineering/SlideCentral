import React from 'react'

export const CarouselItem = ({ item }) => {
  return (
    <div className = "carousel-item">
        
        <div></div>
        <img style = {{height:"100vh", width:"100vh"}}className = "carousel-img" src = {item.icon} />
        
    </div>
  );
}
