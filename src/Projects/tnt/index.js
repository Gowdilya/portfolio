import React from 'react';
import "./tnt.scss";
//import AliceCarousel from 'react-alice-carousel';
//import "react-alice-carousel/lib/alice-carousel.css";
import image1 from './img/1.jpg'
import image2 from './img/2.jpg'
import image3 from './img/3.jpg'
import image4 from './img/4.jpg'
import image5 from './img/5.jpg'
import image7 from './img/7.jpg'
import image8 from './img/8.jpg'
import image9 from './img/9.jpg'
import image10 from './img/10.jpg'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';





export default function Tnt() {

return(

    <div>
    <Carousel >
        <div>
            <img src={image1} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image2} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image3} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image4} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image5} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image7} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image8} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image9} className="sliderimg" alt=""/>
        </div>
        <div>
            <img src={image10} className="sliderimg" alt=""/>
        </div>
 </Carousel>
 </div>

);
}

