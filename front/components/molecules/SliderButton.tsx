import { styled } from "@mui/material";
import { useCallback, useMemo } from "react";
import SliderLabel from "../styled/SliderLabel.styled";

interface SliderButtonProps {
    slide: () => void,
    render: React.ReactElement
}

const SliderButton: React.FC<SliderButtonProps> = (props) => {

    const delay = useCallback(() => setTimeout(props.slide, 300), [props.slide]);

    return (
        <SliderLabel
            onClick={delay}
        >
            <CheckBox />
            {props.render}
        </SliderLabel>
    );
}

const CheckBox = styled("input")({
    id: "slide-left-checkbox",
    type: "checkbox",
    display: "none"
});

export default SliderButton;