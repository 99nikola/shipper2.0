import React, { useCallback, useMemo, useState } from "react";

interface SliderProps {
    items: any[],
    visible: number
}

function noaction() {}

function handleLeft(setItems: React.Dispatch<React.SetStateAction<any[]>>) {
    setItems(items => {
        const first = items[0];
        let newItems = items.slice(1);
        newItems.push(first);
        return newItems;
    });
}

function handleRight(setItems: React.Dispatch<React.SetStateAction<any[]>>) {
    setItems(items => {
        const last = items[items.length-1];
        let newItems = items.slice(0, items.length-1);
        newItems.unshift(last);
        return newItems;
    });
}

function useSlider(props: SliderProps) {
    
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
                right: noaction
            });

        return ({
            items: [items[items.length-1], ...items.slice(0, props.visible), items[props.visible]],
            left,
            right
        });
    }, [items, props.visible]);

    return slider;
}

export default useSlider;