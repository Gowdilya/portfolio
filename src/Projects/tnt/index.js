import React from 'react';
import "./tnt.scss";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from './img/1.jpg'
import image2 from './img/2.jpg'
import image3 from './img/3.jpg'
import image4 from './img/4.jpg'
import image5 from './img/5.jpg'
import image7 from './img/7.jpg'
import image8 from './img/8.jpg'
import image9 from './img/9.jpg'




export default function Tnt() {
    return(<div>
        <div>
        <AliceCarousel 
>
      <img src={image1} className="sliderimg" alt=""/>
      <img src={image2} className="sliderimg" alt=""/>
      <img src={image3} className="sliderimg" alt=""/>
      <img src={image4} className="sliderimg" alt=""/> 
      <img src={image5} className="sliderimg" alt=""/> 
      <img src={image7} className="sliderimg" alt=""/> 
      <img src={image8} className="sliderimg" alt=""/> 
      <img src={image9} className="sliderimg" alt=""/> 
    </AliceCarousel>
    </div>
    </div>)
}