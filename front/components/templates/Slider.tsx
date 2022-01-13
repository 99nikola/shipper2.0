import { ISliderItem } from "../../typescript";
import SliderButtonLeft from "../molecules/SliderButtonLeft";
import SliderButtonRight from "../molecules/SliderButtonRight";
import SliderItems, { SliderItemsProps } from "../organisms/SliderItems";
import { ArrowLeft, ArrowRight } from "../styled/Arrows.syled";
import Flex from "../styled/Flex.styled";

interface SliderProps extends SliderItemsProps {
    slideLeft: () => void,
    slideRight: () => void
}


const Slider: React.FC<SliderProps> = (props) => {        
        return (
            <Flex> 
                <SliderButtonLeft
                    slide={props.slideLeft}
                    render={<ArrowLeft size="2.5rem" />}
                    />

                <Flex direction="row-reverse">
                    <SliderButtonRight
                        slide={props.slideRight}
                        render={<ArrowRight size="2.5rem" />}
                        />
                <SliderItems 
                    items={props.items}
                    render={props.render}
                />

            </Flex>
      </Flex>
    );
}

export default Slider;