import React, { useCallback, useMemo, useState } from "react";
import { ISlider, ISliderItem } from "../typescript";

interface SliderProps {
    items: ISliderItem[],
    visible: number
}

function noaction() {}

function handleLeft(setItems: React.Dispatch<React.SetStateAction<ISliderItem[]>>) {
    setItems(items => {
        const first = items[0];
        let newItems = items.slice(1);
        newItems.push(first);
        return newItems;
    });
}

function handleRight(setItems: React.Dispatch<React.SetStateAction<ISliderItem[]>>) {
    setItems(items => {
        const last = items[items.length-1];
        let newItems = items.slice(0, items.length-1);
        newItems.unshift(last);
        return newItems;
    });
}

function useSlider(props: SliderProps): ISlider {
    
    const [ items, setItems ] = useState(props.items);
    
    const left = useCallback(() => {
        handleLeft(setItems);
    }, [setItems]);
    
    const right = useCallback(() => {
        handleRight(setItems);
    }, [setItems]);

    const slider = useMemo(() => {
        if (props.visible >= items.length)
            return ({
                items,
                left: noaction,
                right: noaction,
                specialCase: false
            });

        if (props.visible + 1 === items.length) 
            return ({
                items: [...items, items[0]],
                left,
                right,
                specialCase: true
            });

        return ({
            items: items.slice(0, props.visible+2),
            left,
            right,
            specialCase: false
        });
    }, [items, props.visible]);

    return slider;
}

export default useSlider;