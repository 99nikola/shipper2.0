import classes from "./slider.module.css";

import { useEffect, useState, useContext, useRef } from "react";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import Items from "./Items"
import { SliderContext } from "../../context/slider/SliderContext";
import {  SET_INDEXES, SET_NUM_ITEMS } from "../../context/slider/SliderActions";

const Slider = ({ Component }) => {
 

   const { indexes, responsive, numItemsVisible, dispatch } = useContext(SliderContext);
   const sliderContainer = useRef();
   const [ width, setWidth ] = useState();

   useEffect(() => {
      setWidth(sliderContainer.current.offsetWidth);

      let timeout;
      const resizeHandler = () => {
         clearTimeout(timeout);
         timeout = setTimeout(() => setWidth(sliderContainer.current.offsetWidth), 200);
      };
      
      window.addEventListener("resize", resizeHandler);

      return () => window.removeEventListener("resize", resizeHandler);
   }, []);
   
   useEffect(() => {
      for (let size of responsive) {
         if (width <= size.breakpoint) {
            if (numItemsVisible !== size.items) {
               dispatch({ type: SET_NUM_ITEMS, payload: size.items });
            }
            break;
         }
      }
   }, [width]);

   const [ leftCheckRef, leftLabelRef, rightCheckRef, rightLabelRef ] = [ useRef(), useRef(), useRef(), useRef() ];
   
   const leftHandler = () => {
      leftLabelRef.current.htmlFor = "disabled";
      setTimeout(() => {
         let clone = indexes.slice(0);
         clone.push(clone[0]);
         clone.shift();
         
         dispatch({ type: SET_INDEXES, payload: clone });
         leftLabelRef.current.htmlFor = "leftRadio";
         leftCheckRef.current.checked = false;
      }, 250);
   }

   const rightHandler = () => {
      rightLabelRef.current.htmlFor = "disabled";
      setTimeout(() => {
         let clone = indexes.slice(0);
         clone.unshift(clone[clone.length-1]);
         clone.pop();
         
         dispatch({ type: SET_INDEXES, payload: clone });
         rightLabelRef.current.htmlFor = "rightRadio";
         rightCheckRef.current.checked = false;
      }, 250);
   }

   return (
      <div 
         className={classes.container}
         ref={sliderContainer}
         >
         
         <input 
            className={classes.leftRadio} 
            type="checkbox" 
            id="leftRadio" 
            ref={leftCheckRef}
            hidden={true}
            onClick={leftHandler}
            />
         <div className={classes.arrowLeft}>
            <label 
               htmlFor="leftRadio"
               ref={leftLabelRef}
               >
                  <HiArrowCircleLeft 
                     className={classes.arrow}
                  />
            </label>
         </div>

         <div className={classes.changePositions}>
            <input 
               className={classes.rigthRadio} 
               type="checkbox" 
               id="rightRadio" 
               ref={rightCheckRef}
               hidden={true}
               onClick={rightHandler}
               />
            <label
               className={classes.arrowRight}
               htmlFor="rightRadio"
               ref={rightLabelRef}
               >
               <HiArrowCircleRight 
                  className={classes.arrow}
               />
            </label>
         
            <div className={classes.items}>
               {indexes.length !== 0 && (
                  <Items 
                     Component={Component} 
                     />
               )}
            </div>
         </div>
         
      </div>
   )
}

export default Slider
