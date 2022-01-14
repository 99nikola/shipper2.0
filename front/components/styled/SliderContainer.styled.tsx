import { styled } from "@mui/material";

const SliderContainer = styled("div")({
    display: "flex",
    gap: ".5rem",
    position: "relative",
    overflow: "hidden",
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