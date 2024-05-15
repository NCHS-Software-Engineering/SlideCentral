
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './Carousel.css';
import { CarouselItem } from './CarouselItem2';

export const Carousel = () => { 
    
    const handle = useFullScreenHandle(); // Create a handle for the full screen mode
    const [ activeIndex, setActiveIndex ] = React.useState(0) // Create a state for the active index
    const [ progress, setProgress ] = useState(0); // Create a state for the progress bar
    const [ isFullScreen, setIsFullScreen ] = useState(false); // Create a state for fullscreen mode
    const [isLoading, setIsLoading] = useState(true); // Create a state for loading status
    const [items, setItems] = useState([]); // Create a state for the images


    useEffect(() => {
        axios.get('http://localhost:5000/imageTemplate')
          .then(response => {
            const updatedItems = response.data.map(item => item ? item.replace('http://localhost:3000', '') : '');
            setItems(updatedItems);
            console.log(updatedItems);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

  
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

    useEffect(() => {
        // Simulate image loading
        const loadImages = async () => {
            await Promise.all(
                items.map((image) => {
                    return new Promise((resolve, reject) => {
                        const loadImg = new Image()
                        loadImg.src = image
                        loadImg.onload = () => resolve(image)
                        loadImg.onerror = err => reject(err)
                    })
                })
            )
            setIsLoading(false)
        }
        loadImages()
    }, [])

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

    useEffect(() => { // Create a timer to change the activeIndex state every 15 seconds
        const timer = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 15000);
    
        const progressTimer = setInterval(() => { 
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    return 0;
                }
                return oldProgress + 100 / (15 * 100); 
            });
        }, 10); 
    
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
            {isLoading ? (
                <div>Loading...</div> // Replace this with your loading spinner
            ) : (
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
                <div className="pbaronecontainerone">
                    <div className="pbaronecontainertwo">
                        <div style={{ width: `${progress}%` }} className="pbarone"></div>
                    </div>
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
            )}
        </div>
    )
}

export default Carousel;