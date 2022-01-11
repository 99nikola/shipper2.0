import { ISliderItem } from "../../typescript";
import Button from "../atoms/Button";
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
            <Button 
                onClick={props.handleLeft}
            >
                <ArrowLeft size="2.5rem" />
            </Button>
            
            <SliderItems 
                items={props.items}
            />

            <Button
                onClick={props.handleRight}
            >
                <ArrowRight size="2.5rem" />
            </Button>
      </Flex>
    );
}

export default Slider;