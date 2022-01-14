import { createRef, useCallback } from "react";
import { delaySlide } from "../../utils/slide";
import Checkbox from "../atoms/Checkbox";
import { SliderLabelLeft } from "../styled/SliderLabel.styled";

interface SliderButtonProps {
    slide: () => void,
    render: React.ReactElement
}

const SliderButtonLeft: React.FC<SliderButtonProps> = (props) => {

    const checkboxRef = createRef<HTMLInputElement>();
    const labelRef = createRef<HTMLLabelElement>();

    const slide = useCallback(() => {
        if (checkboxRef.current === null || labelRef.current === null)
            return;

        delaySlide(checkboxRef.current, labelRef.current, props.slide);
    }, [checkboxRef, labelRef, props.slide]);

    return (
    <>
        <SliderLabelLeft
            htmlFor="slide-left"
            ref={labelRef}
            >
            {props.render}
        </SliderLabelLeft>
        <Checkbox 
            onClick={slide}
            id="slide-left" 
            display="none"
            ref={checkboxRef}
            />
    </>
    );
}

export default SliderButtonLeft;