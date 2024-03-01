
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CarouselItem } from './CarouselItem2';
import './Carousel.css';
import { images } from '../Media/slides';

export const Carousel = () => { 
    
    const handle = useFullScreenHandle(); // Create a handle for the full screen mode
    const [ activeIndex, setActiveIndex ] = React.useState(0) // Create a state for the active index
    const [ progress, setProgress ] = useState(0); // Create a state for the progress bar
    const [ isFullScreen, setIsFullScreen ] = useState(false); // Create a state for fullscreen mode
    const items = images.map((image, index) => ({ // Create an array of items for the carousel
        title: `Example ${index + 1}`,
        icon: image,
    }));

  
    const updateIndex = (newIndex) => { // Update the activeIndex state
        if (newIndex < 0) {
            newIndex = items.length - 1;
        } else if (newIndex >= items.length) {
            newIndex = 0;
        }
    
        setActiveIndex(newIndex);
        setProgress(0);
    }

    const handleInputChange = (event) => { // Update the activeIndex state when the input changes
        const newIndex = parseInt(event.target.value, 10) - 1; 
        updateIndex(newIndex);
    }

    useEffect(() => { // Add event listeners for the left and right arrow keys
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

    useEffect(() => { // Create a timer to automatically change the activeIndex every 15 seconds
        const timer = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 15000);

        const progressTimer = setInterval(() => { // Create a timer to update the progress bar every 0.1 seconds
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

    useEffect(() => { // Add event listeners for the left and right arrow keys and the f key for fullscreen mode
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    updateIndex(activeIndex - 1);
                    break;
                case 'ArrowRight':
                    updateIndex(activeIndex + 1);
                    break;
                case 'f':
                    if (isFullScreen) {
                        handle.exit();
                    } else {
                        handle.enter();
                    }
                    break;
                default:
                    break;
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeIndex, isFullScreen]);

    return (
        <div>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <button onClick={() => {
                        updateIndex(activeIndex - 1);
                    }} className="button-arrow button-arrow-left">
                        <span class="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <div className="carousel">
                        <FullScreen className={isFullScreen ? "fullScreen fullscreen" : "fullScreen"} handle={handle} onChange={isFull => setIsFullScreen(isFull)}>
                            <div className="inner"
                                style={{ transform: `translate(-${activeIndex * 100}%)` }}>
                                {items.map((item) => {
                                    return <CarouselItem item={item} isFullScreen={isFullScreen} />
                                })}
                            </div>
                        </FullScreen>
                    </div>
                    <button onClick={() => {
                        updateIndex(activeIndex + 1);
                    }} className="button-arrow button-arrow-right">
                        <span class="material-symbols-outlined">arrow_forward_ios</span>
                    </button>
                </div>
                <div className="carousel-buttons">
                    <label>
                        Slide:
                        <input type="number" value={activeIndex + 1} onChange={handleInputChange} min="1" max={items.length} className="slide-input" />
                    </label>
                    <button className="fullscreen-button" onClick={handle.enter}>
                        <span class="material-symbols-outlined">fullscreen</span>
                    </button>
                </div>
            </div>
            <div className="pbaronecontainerone">
                <div className="pbaronecontainertwo">
                    <div style={{ width: `${progress}%` }} className="pbarone"></div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;