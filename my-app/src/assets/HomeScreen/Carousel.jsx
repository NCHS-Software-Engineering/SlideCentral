
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CarouselItem } from './CarouselItem2';
import './Carousel.css';
import { images } from '../Media/slides';

export const Carousel = () => {
    
    const handle = useFullScreenHandle();
    const [ activeIndex, setActiveIndex ] = React.useState(0)
    const [ progress, setProgress ] = useState(0);
    const items = images.map((image, index) => ({
        title: `Example ${index + 1}`,
        icon: image,
    }));

  
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = items.length - 1; // Wrap around to the last slide if the index is less than 0
        } else if (newIndex >= items.length) {
            newIndex = 0; // Wrap around to the first slide if the index is greater than or equal to the number of slides
        }
    
        setActiveIndex(newIndex);
        setProgress(0); // Reset progress when slide changes
    }

    const handleInputChange = (event) => {
        const newIndex = parseInt(event.target.value, 10) - 1; // Subtract 1 because slide numbers start at 1
        updateIndex(newIndex);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    updateIndex(activeIndex - 1);
                    break;
                case 'ArrowRight':
                    updateIndex(activeIndex + 1);
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 15000);

        const progressTimer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    return 0;
                }
                return oldProgress + 100 / (15 * 10); // Increase progress every 0.1 seconds
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        }
    }, [activeIndex]);


  return (
    <div>
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
                    <div className = "sidetoside">
                        <button onClick={()=>{
                            updateIndex(activeIndex - 1);
                        
                        }}  className = "button-arrow" >
                        <span class="material-symbols-outlined">arrow_back_ios</span>
                        </button>
                        <div className= "indicators">
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
                        className = "button-arrow">

                            <span class="material-symbols-outlined">arrow_forward_ios</span>
                        </button> 
                    </div>
                    <label>
                    Slide: 
                        <input type="number" value={activeIndex + 1} onChange={handleInputChange} min="1" max={items.length} className="slide-input"/>
                    </label>
                    <button className = "fullscreen-button" onClick={handle.enter} > 
                        <span class="material-symbols-outlined">fullscreen</span>
                    </button>       
                </div>
            </div>
        </div>
        <div className ="pbaronecontainerone">
            <div className = "pbaronecontainertwo">
                <div style={{ width: `${progress}%`}} className="pbarone"></div>
            </div>
        </div>
    </div>
    
  )
}

export default Carousel;