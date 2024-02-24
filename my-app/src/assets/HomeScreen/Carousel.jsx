import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CarouselItem } from './CarouselItem2';
import './Carousel.css';

export const Carousel = () => {
    
    const handle = useFullScreenHandle();
    const [ activeIndex, setActiveIndex ] = React.useState(0)
    const items = [
        {   title: "Example 1",
            icon: require("../Media/slides/slide1.png"),
        },
        {   
            title: "Example 2",
            icon: require("../Media/slides/slide2.png"),
        },
        {   
            title: "Example 3",
            icon: require("../Media/slides/slide3.png"),
        },
        {   
            title: "Example 4",
            icon: require("../Media/slides/slide4.png"),
        }
    ]

  
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
        newIndex = 0;
    }else if (newIndex >= items.length) {
        newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  }

  return (
    
    

    
       
    <div className = "carousel-container">
        <div className = "carousel">
            <FullScreen className = "fullScreen" handle={handle}>
            <div className = "inner"
                style={{transform: `translate(-${activeIndex * 100}%)`}}>
                {items.map((item) => {
                    return <CarouselItem item = {item}/>    
                })}
            </div>
            </FullScreen>
            <div className = "carousel-buttons"> 
                <button onClick={()=>{
                    updateIndex(activeIndex - 1);
                
                }}  classname = "button-arrow" style = {{background: "none"}}>
                <span class="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <div classname= "indicators">
                    {items.map((item, index) => {
                        return(
                            <button onClick={()=>{
                                updateIndex(index);
                            }}
                            
                            className="indicator-buttons"> 
                    
                        <span className={`material-symbols-outlined  ${index === activeIndex? "indicator-symbol-active": "indicator-symbol"}`}>
                        radio_button_checked
                        </span>

                    </button>
                    );

                    })}



                    
                </div>

                <button onClick={()=>{
                    updateIndex(activeIndex + 1);
                
                }}
                classname = "button-arrow" style = {{background: "none"}}>

                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </button> 

                <button className = "fullscreen-button" onClick={handle.enter} > 
                    <span class="material-symbols-outlined">fullscreen</span>
                </button>       
            </div>
        
        </div>
    </div>
    
  )
}

export default Carousel;