import { useCallback, useRef, useState } from "react";
import { EDir, slide } from "../../animations/slide";
import { ISlider } from "../../typescript";
import { throttle } from "../../utils";
import SliderNavigation from "../molecules/SliderNavigation";
import SliderItems from "../organisms/SliderItems";
import Flex from "../styled/Flex.styled";

interface SliderProps {
    slider: ISlider,
    render: (item: any) => React.ReactElement,
    duration?: number
}

const Slider: React.FC<SliderProps> = (props) => {    
    
        const sliderContainer = useRef<HTMLDivElement>(null);
        const [ childWidth, setChildWidth ] = useState();
        const [ resizeObserver, setResizeObserver ] = useState<ResizeObserver>();

        useEffect(() => {
            setResizeObserver(new ResizeObserver(entries => {
                if (entries.length === 0)
                    return;
                
                const entry = entries[0];
                
                if (!entry.contentBoxSize) 
                    return;

                const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
                setChildWidth(contentBoxSize.inlineSize);
            }));
        }, [setChildWidth, setResizeObserver]);

        const slideLeft = useCallback(throttle(() => {
            if (sliderContainer.current === null || childWidth === undefined)
            return;
            
            slide(sliderContainer.current, childWidth, EDir.LEFT, props.duration as number)
                .then(props.slider.left);
            
        }, props.duration as number), [props.slider.left, sliderContainer.current, childWidth, props.duration]);
        
        const slideRight = useCallback(throttle(() => {
            if (sliderContainer.current === null || childWidth === undefined)
            return;
            
            slide(sliderContainer.current, childWidth, EDir.RIGHT, props.duration as number)
                .then(props.slider.right);
            
        }, props.duration as number), [props.slider.right, sliderContainer.current, childWidth, props.duration]);

        return (
            <Flex direction="column" alignItems="center"> 
                <SliderItems 
                    items={props.slider.items}
                    render={props.render}
                    specialCase={props.slider.specialCase}
                    ref={sliderContainer}
                    resizeObserver={resizeObserver}
                    />
                <SliderNavigation 
                    slideLeft={slideLeft}
                    slideRight={slideRight}
                />
            </Flex>
    );
}

Slider.defaultProps = {
    duration: 300
}

export default Slider;