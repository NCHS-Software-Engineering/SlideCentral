import React, {useState} from 'react'
import { CarouselItem } from './CarouselItem2'

export const Carousel = () => {
    const [ activeIndex, setActiveIndex ] = React.useState(0)
    const items = [
        {   title: "Example 1",
            description: "JAMES PETERSON",
            icon: require("./Media/slide1.png"),
        },
        {   
            title: "Example 2",
            description: "JAMES CONNOR",
            icon: require("./Media/slide2.png"),
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
    <div className = "carousel">
        <div className = "inner"
             style={{transform: `translate(-${activeIndex * 100}%)`}}>
            {items.map((item) => {
                return <CarouselItem item = {item}/>    
            })}
        </div>
        
        <div className = "carousel-buttons"> 
            <button onClick={()=>{
                updateIndex(activeIndex - 1);
            
            }}  classname = "button-arrow">
            <span className="material-symbols-outlined">arrow_back_ios</span>
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
            classname = "button-arrow">

            <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>        
        </div>

    </div>
  )
}
