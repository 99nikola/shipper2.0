import { styled } from "@mui/material";
import { forwardRef, ReactNode } from "react";

const style = {
    overflow: "hidden"
}

const SliderContainer = forwardRef<HTMLDivElement, ReactNode>((props, ref) => (
    <div style={style}>
        <MainSliderContainer ref={ref}>
            {props.children}
        </MainSliderContainer>
    </div>
));

const MainSliderContainer = styled("div")({
    display: "flex",
    gap: ".5rem",
    position: "relative",
    overflow: "visible",
    "& > .slider-item:first-of-type": {
        position: "absolute",
        left: 0,
        transform: "translateX(calc(-100% - .5rem))"
    },
    "& > .slider-item:last-of-type": {
        position: "absolute",
        right: 0,
        transform: "translateX(calc(100% + .5rem))"
    }
});

export default SliderContainer;