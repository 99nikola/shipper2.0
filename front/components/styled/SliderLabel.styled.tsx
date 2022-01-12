import { styled } from "@mui/material";


const SliderLabel= styled("label")(({ theme }) => ({
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

export default SliderLabel;