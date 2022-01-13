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
    "& + #slide-left:checked + div > div > div > div": {
        animationName: "slideLeft",
        animationDuration: "300ms"
    }
});


export const SliderLabelRight = styled(SliderLabel)<InputLabelProps>({
    "& + #slide-right:checked + div > div > div": {
        animationName: "slideRight",
        animationDuration: "300ms"
    }
});
