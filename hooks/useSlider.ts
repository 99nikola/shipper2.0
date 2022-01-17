import React, { useCallback, useMemo, useState } from "react";
import { ISlider, ISliderItem, ISliderNav } from "../typescript";

interface SliderProps {
    length: number
    visible: number
}

function handleLeft(setNav: React.Dispatch<React.SetStateAction<ISliderNav>>) {
    setNav(nav => ({
            left: nav.left + 1,
            right: nav.right + 1
    }));
}

function handleRight(setNav: React.Dispatch<React.SetStateAction<ISliderNav>>) {
    setNav(nav => ({
        left: nav.left - 1,
        right: nav.right - 1
    }));
}

function useSlider(props: SliderProps): ISlider {
    
    const [ nav, setNav ] = useState<ISliderNav>(() => {
        if (props.length === 0)
            return ({
                left: 0,
                right: 0
            });

        if (props.length <= props.visible)
            return ({
                left: 0,
                right: props.length
            });

        if (props.length === props.visible+1)
            return ({
                left: 0,
                right: props.visible+1
            });

        return ({
            left: 0,
            right: props.visible+2
        });
    });
    
    const left = useCallback(() => {
        handleLeft(setNav);
    }, [setNav]);
    
    const right = useCallback(() => {
        handleRight(setNav);
    }, [setNav]);

    const slider = useMemo(() => {
        const handleLeft = (nav.right+1) >= props.length 
            ? false
            : left;

        const handleRight = (nav.left-1) < 0 
            ? false
            : right;
            
        return ({
            left: {
                src: nav.left,
                handle: handleLeft
            },
            right: {
                dest: nav.right,
                handle: handleRight
            }
        });

    }, [props.length, props.visible, nav]);

    return slider;
}

export default useSlider;