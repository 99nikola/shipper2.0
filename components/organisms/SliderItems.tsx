import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { ISliderItem } from "../../typescript";
import SliderContainer from "../styled/SliderContainer.styled";
import SliderItem from "../styled/SliderItem.styled";

interface SliderItemsProps {
    items: ISliderItem[],
    render: (item: ISliderItem) => React.ReactElement,
    specialCase: boolean,
    resizeObserver?: ResizeObserver
}

const SliderItems = forwardRef<HTMLDivElement, SliderItemsProps>((props, ref) => {

    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef.current === null || props.resizeObserver === undefined)
            return;

        props.resizeObserver.observe(itemRef.current);
    }, [itemRef, props.resizeObserver]);

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
        })), [props.items, props.render, props.specialCase, itemRef.current]);

    return (
        <SliderContainer
            ref={ref}
        >
            {Items}
        </SliderContainer>
    );
});

SliderItems.displayName = "SliderItems";

export default memo(SliderItems);