import React from 'react'
import { CarouselItem } from './CarouselItem'

export const Carousel = () => {
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
        <div className = "inner">
            {items.map((item) => {
                return <CarouselItem item = {item}/>    
            })}


        
        </div>
        
    </div>
  )
}
