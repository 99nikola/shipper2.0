import { useContext, useMemo } from "react";
import { SliderContext } from "../../context/slider/SliderContext";
import classes from "./slider.module.css";

const Items = ({ Component, slide }) => {

   const { numItemsVisible, items, indexes, linkId } = useContext(SliderContext);

   const Items = useMemo(() => {

      let itemsToRender = [];
      let num = numItemsVisible;
      
      if (numItemsVisible > items.length)
         num = items.length;

      for (let i=0; i<num; i++){
         itemsToRender.push(
            <div key={i} className={classes.normal}>
               <Component
                  className={classes.item}
                  key={items[indexes[i]].id}
                  values={items[indexes[i]]}
                  />
            </div>
            )
         }
         
         return itemsToRender;
         
      }, [ numItemsVisible, items, indexes, linkId ]);

   return Items;
 }

 export default Items