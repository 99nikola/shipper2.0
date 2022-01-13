import { styled } from "@mui/material";


const SliderContainer = styled("div")({
    display: "flex",
    gap: ".5rem",
    position: "relative",
    overflow: "hidden",
    "& > div:first-of-type": {
        position: "absolute",
        left: 0,
        transform: "translateX(calc(-100% - .5rem))"
    },
    "& > div:last-of-type": {
        position: "absolute",
        right: 0,
        transform: "translateX(calc(100% + .5rem))"
    }
});

export default SliderContainer;