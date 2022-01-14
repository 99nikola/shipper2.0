import { createRef, useCallback } from "react";
import { delaySlide } from "../../utils/slide";
import Checkbox from "../atoms/Checkbox";
import { SliderLabelRight } from "../styled/SliderLabel.styled";

interface SliderButtonProps {
    slide: () => void,
    render: React.ReactElement
}

const SliderButtonRight: React.FC<SliderButtonProps> = (props) => {

    const checkboxRef = createRef<HTMLInputElement>();
    const labelRef = createRef<HTMLLabelElement>();

    const slide = useCallback(() => {
        if (checkboxRef.current === null || labelRef.current === null)
            return;

        delaySlide(checkboxRef.current, labelRef.current, props.slide);
    }, [checkboxRef, labelRef, props.slide]);

    return (
    <>
        <SliderLabelRight
            htmlFor="slide-right"
            ref={labelRef}
            >
            {props.render}
        </SliderLabelRight>
        <Checkbox 
            onClick={slide}
            id="slide-right"
            display="none"
            ref={checkboxRef}
        />
    </>
    );
}

export default SliderButtonRight;