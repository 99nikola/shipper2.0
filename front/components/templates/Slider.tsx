import { ISlider, ISliderItem } from "../../typescript";
import SliderButtonLeft from "../molecules/SliderButtonLeft";
import SliderButtonRight from "../molecules/SliderButtonRight";
import SliderItems from "../organisms/SliderItems";
import { ArrowLeft, ArrowRight } from "../styled/Arrows.syled";
import Flex from "../styled/Flex.styled";

interface SliderProps {
    slider: ISlider,
    render: (item: any) => React.ReactElement,
}

const Slider: React.FC<SliderProps> = (props) => {        
        return (
            <Flex> 
                <SliderButtonLeft
                    slide={props.slider.left}
                    render={<ArrowLeft size="2.5rem" />}
                    />

                <Flex direction="row-reverse">
                    <SliderButtonRight
                        slide={props.slider.right}
                        render={<ArrowRight size="2.5rem" />}
                        />
                <SliderItems 
                    items={props.slider.items}
                    render={props.render}
                    specialCase={props.slider.specialCase}
                />

            </Flex>
      </Flex>
    );
}

export default Slider;