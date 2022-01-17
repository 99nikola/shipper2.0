import { useCallback, useRef, useState } from "react";
import { EDir, slide } from "../../animations/slide";
import { ISlider, ISliderItem } from "../../typescript";
import SliderNavigation from "../molecules/SliderNavigation";
import SliderItems from "../organisms/SliderItems";
import Flex from "../styled/Flex.styled";

interface SliderProps {
    items: ISliderItem[],
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
            
            if (props.slider.left.handle === false) {
                slide(sliderContainer.current, width, EDir.LEFT, props.duration as number, true);
                return;
            }

            slide(sliderContainer.current, width, EDir.LEFT, props.duration as number)
                .then(props.slider.left.handle as () => void);

        }, [props.slider.left, sliderContainer, width, props.duration]);

        const slideRight = useCallback(() => {
            if (sliderContainer.current === null || width === undefined)
                return;

            if (props.slider.right.handle === false) {
                slide(sliderContainer.current, width, EDir.RIGHT, props.duration as number, true);
                return;    
            }

            slide(sliderContainer.current, width, EDir.RIGHT, props.duration as number)
                .then(props.slider.right.handle as () => void);

        }, [props.slider.right, sliderContainer, width, props.duration]);

        return (
            <Flex direction="column" alignItems="center"> 
                <SliderItems 
                    items={props.items}
                    render={props.render}
                    ref={sliderContainer}
                    setWidth={setWidth}
                    left={props.slider.left.src}
                    right={props.slider.right.dest}
                    />
                <SliderNavigation 
                    slideLeft={slideLeft}
                    //leftDisabled={handleLeftDisabled}
                    slideRight={slideRight}
                    //rightDisabled={handleRightDisabled}
                />
            </Flex>
    );
}

Slider.defaultProps = {
    duration: 300
}

export default Slider;