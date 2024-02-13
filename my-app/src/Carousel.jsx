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
        },
        {
            title: "Example 3",
            description: "JAMES BOND",
            icon: require("./Media/logo1.png"),
        },
    ]


  return (
    <div className = "carousel">
        <div className = "inner"
             style={{transform: `translate:(-${activeIndex * 100})`}}>
            {items.map((item) => {
                return <CarouselItem item = {item}/>    
            })}
        </div>
        
        <div className = "carousel-buttons"> 
            <button classname = "button-arrow">
            <span class="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div classname= "indicators">
                {items.map((item, index) => {
                    return(
                        <button className="indicator-buttons"> 
                
                    <span class="material-symbols-outlined">
                     radio_button_checked
                    </span>

                </button>
                    );

                })}



                
            </div>
            <button classname = "button-arrow">
            <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>        
        </div>

    </div>
  )
}
