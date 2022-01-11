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

type SliderReturn = [
    items: any[],
    left: () => void,
    right: () => void
]

function useSlider(props: SliderProps): SliderReturn {
    
    const [ items, setItems ] = useState(props.items);
    const visibleItems = useMemo(() => items.slice(0, props.visible), [items, props.visible]);

    const left = useCallback(() => {
        handleLeft(setItems);
    }, [setItems]);
    
    const right = useCallback(() => {
        handleRight(setItems);
    }, [setItems]);

    if (props.visible >= items.length)
        return [ items, noaction, noaction ];

    return [ visibleItems, left, right ];
}

export default useSlider;