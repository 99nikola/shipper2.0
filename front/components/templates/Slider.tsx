import SliderButton from "../molecules/SliderButton";
import SliderItems, { SliderItemsProps } from "../organisms/SliderItems";
import { ArrowLeft, ArrowRight } from "../styled/Arrows.syled";
import Flex from "../styled/Flex.styled";

interface SliderProps extends SliderItemsProps {
    handleLeft: () => void,
    handleRight: () => void
}

const Slider: React.FC<SliderProps> = (props) => {
    return (
        <Flex>
            <SliderButton
                slide={props.handleLeft}
                render={<ArrowLeft size="2.5rem" />}
            />

            <Flex direction="row-reverse">
                <SliderButton
                    slide={props.handleRight}
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