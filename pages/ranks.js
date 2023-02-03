import { MotionConfig, motion } from 'framer-motion';
import React, { useState,useRef, useEffect } from 'react'
import ReactDOM from "react-dom";
import images from '../public/images/images.js';

export default function ranks() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth )
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [])

  let imageSet = [];
  const category = ['Muay Thai', 'Karate', 'Womens Boxing', 'Men Boxing', 'Taekwondo', 'Sparring']; 
  // const link = ['Muay Thai', '#', '#', '#', '#', '#']; 
  let count = 0;
  for(let i in images){
    let item = imageSet[count];
    imageSet.push({
      key : count,
      image : images[count],
      category: category[count]
      // link: link[count]
    });
    // console.log(item);
    count++
  }
  
  // console.log(imageSet);
  // console.log(images);
  return (
    <>
    <div className='eventClass'>
    <h1 className='eventsH1' style={{ textAlign: 'center' }}>Home</h1>
      <div className="events">
        <motion.div  ref={carousel} className="carousel samplecarousel" whileTap={{cursor: "grabbing"}}>
          <motion.div 
          drag="x" 
          dragConstraints={{right:0, left: -width}} 
          className="inner-carousel">
          {imageSet.map((item) => {
              
              return (
            
                <motion.div className='item' key={item.key} >
                  <a href='./ranks'>
                      <img src={item.image.src} alt="" />
                      <div className='innerImgHeader'>
                        <h1> {item.category} </h1>
                         </div>
                         </a>
                </motion.div>
               
              )
            })
            }

          </motion.div>
        </motion.div>

      </div>
      </div>
    </>
  )
}
