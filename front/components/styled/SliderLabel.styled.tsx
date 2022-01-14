import { InputLabelProps, styled } from "@mui/material";


const SliderLabel = styled("label")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ".25rem",
    color: theme.color.textOnPrimary,
    backgroundColor: theme.color.secondary,
    padding: ".5rem",
    cursor: "pointer",
    "&:active": {
        backgroundColor: theme.color.secondaryHover
    }
}));

export const SliderLabelLeft = styled(SliderLabel)<InputLabelProps>({
    "& + #slide-left:checked + div .slider-item": {
        animationName: "slideLeft",
        animationDuration: "300ms"
    },
    "& + #slide-left:checked + div .slider-item:first-of-type": {
        animationName: "none"
    },
    "& + #slide-left:checked + div .slider-item:last-of-type": {
        animationName: "slideLast",
        animationDuration: "300ms"
    }
});

export const SliderLabelRight = styled(SliderLabel)<InputLabelProps>({
    "& + #slide-right:checked + div > .slider-item": {
        animationName: "slideRight",
        animationDuration: "300ms"
    },
    "& + #slide-right:checked + div > .slider-item:last-of-type": {
        animationName: "none"
    },
    "& + #slide-right:checked + div > .slider-item:first-of-type": {
        animationName: "slideFirst",
        animationDuration: "300ms"
    }
});
