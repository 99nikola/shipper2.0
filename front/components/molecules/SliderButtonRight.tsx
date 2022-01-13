import { createRef, useCallback } from "react";
import { delaySlide } from "../../utils/slide";
import Checkbox from "../atoms/Checkbox";
import { SliderLabelRight } from "../styled/SliderLabel.styled";

interface SliderButtonProps {
    slide: () => void,
    render: React.ReactElement
}

const SliderButtonRight: React.FC<SliderButtonProps> = (props) => {

    const checkbox = createRef<HTMLInputElement>();

    const slide = useCallback(() => {
        if (checkbox.current === null)
            return;
        delaySlide(checkbox.current, props.slide);
    }, [checkbox, props.slide]);

    return (
    <>
        <SliderLabelRight
            onClick={slide}
            htmlFor="slide-right"
        >
            {props.render}
        </SliderLabelRight>
        <Checkbox 
            id="slide-right"
            display="none"
            ref={checkbox}
        />
    </>
    );
}

export default SliderButtonRight;