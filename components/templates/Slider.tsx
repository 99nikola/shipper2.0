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
        const [ chidlWidth, setChildWidth ] = useState();

        const slideLeft = useCallback(throttle(() => {
            if (sliderContainer.current === null || chidlWidth === undefined)
            return;
            
            slide(sliderContainer.current, chidlWidth, EDir.LEFT, props.duration as number)
                .then(props.slider.left);
            
        }, props.duration as number), [props.slider.left, sliderContainer.current, chidlWidth, props.duration]);
        
        const slideRight = useCallback(throttle(() => {
            if (sliderContainer.current === null || chidlWidth === undefined)
            return;
            
            slide(sliderContainer.current, chidlWidth, EDir.RIGHT, props.duration as number)
                .then(props.slider.right);
            
        }, props.duration as number), [props.slider.right, sliderContainer.current, chidlWidth, props.duration]);

        return (
            <Flex direction="column" alignItems="center"> 
                <SliderItems 
                    items={props.slider.items}
                    render={props.render}
                    specialCase={props.slider.specialCase}
                    ref={sliderContainer}
                    setWidth={setChildWidth}
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