import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { ISliderItem } from "../../typescript";
import SliderContainer from "../styled/SliderContainer.styled";
import SliderItem from "../styled/SliderItem.styled";

interface SliderItemsProps {
    items: ISliderItem[],
    render: (item: ISliderItem) => React.ReactElement,
    specialCase: boolean,
    setWidth: React.Dispatch<React.SetStateAction<any>>
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

    const Items = useMemo(() => (
        props.items.map((item, i) => {
            let id = item.id;
            if (props.specialCase && (i==0 || i==props.items.length))
                id += ("" + i);
            
            return (
                <SliderItem className="slider-item" key={id} ref={i === 0 ? itemRef : undefined}>
                    {props.render(item)}
                </SliderItem>
            );
        })), [props.items, props.render, props.specialCase, itemRef]);

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