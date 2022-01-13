import { createRef, useCallback } from "react";
import { delaySlide } from "../../utils/slide";
import Checkbox from "../atoms/Checkbox";
import { SliderLabelLeft } from "../styled/SliderLabel.styled";

interface SliderButtonProps {
    slide: () => void,
    render: React.ReactElement
}

const SliderButtonLeft: React.FC<SliderButtonProps> = (props) => {

    const checkbox = createRef<HTMLInputElement>();

    const slide = useCallback(() => {
        if (checkbox.current === null)
            return;
        delaySlide(checkbox.current, props.slide);
    }, [checkbox, props.slide]);

    return (
    <>
        <SliderLabelLeft
            onClick={slide}
            htmlFor="slide-left"
        >
            {props.render}
        </SliderLabelLeft>
        <Checkbox 
            id="slide-left" 
            display="none"
            ref={checkbox}
            />
    </>
    );
}

export default SliderButtonLeft;