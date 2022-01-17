import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { ISliderItem } from "../../typescript";
import SliderContainer from "../styled/SliderContainer.styled";
import SliderItem from "../styled/SliderItem.styled";

interface SliderItemsProps {
    items: ISliderItem[],
    render: (item: ISliderItem) => React.ReactElement,
    setWidth: React.Dispatch<React.SetStateAction<any>>,
    left: number,
    right: number
}

const SliderItems = forwardRef<HTMLDivElement, SliderItemsProps>((props, ref) => {

    const itemRef = useRef<HTMLDivElement>(null);

    const handleResize = useCallback(() => {
        props.setWidth(itemRef.current?.offsetWidth);
    }, [itemRef, props.setWidth]);

    useEffect(() => {
        if (itemRef.current === null)
            return;

        props.setWidth(itemRef.current.offsetWidth);
        itemRef.current.addEventListener("resize", handleResize);

        return () => itemRef.current?.removeEventListener("resize", handleResize);
    }, [itemRef, props.setWidth, handleResize]);

    const Items = useMemo(() => {
        let items = [];

        for (let i=props.left; i<props.right; i++) {
            const item = props.items[i];
            items.push(
                <SliderItem className="slider-item" key={item.id} ref={i === 0 ? itemRef : undefined}>
                    {props.render(item)}
                </SliderItem>   
            );
        }
        
        return items;
    }, [props.items, props.render, itemRef, props.left, props.right]);

    return (
        <SliderContainer
            ref={ref}
        >
            {Items}
        </SliderContainer>
    );
});

SliderItems.displayName = "SliderItems";

export default SliderItems;