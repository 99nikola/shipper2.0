import { useCallback, useRef, useState } from "react";
import { EDir, slide } from "../../animations/slide";
import { ISlider } from "../../typescript";
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
        const [ width, setWidth ] = useState();
        
        const slideLeft = useCallback(() => {
            if (sliderContainer.current === null || width === undefined)
                return;

            slide(sliderContainer.current, width, EDir.LEFT, props.duration as number)
                .then(props.slider.left);

        }, [props.slider.left, sliderContainer, width]);

        const slideRight = useCallback(() => {
            if (sliderContainer.current === null || width === undefined)
                return;

            slide(sliderContainer.current, width, EDir.RIGHT, props.duration as number)
                .then(props.slider.right);

        }, [props.slider.right, sliderContainer, width]);

        return (
            <Flex direction="column" alignItems="center"> 
                <SliderItems 
                    items={props.slider.items}
                    render={props.render}
                    specialCase={props.slider.specialCase}
                    ref={sliderContainer}
                    setWidth={setWidth}
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