import "./Slide.scss";
import Slider from "infinite-react-carousel";

import React from "react";

export const Slide = ({ children, slidesToShow, arrowsScroll }) => {
   return (
      <div className="slide">
         <div className="container">
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
               {children}
            </Slider>
         </div>
      </div>
   );
};
