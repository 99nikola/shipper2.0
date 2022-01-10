import { styled } from "@mui/material";

const Nav = styled("nav")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: ".5rem",
    backgroundColor: theme.color.primary,
    color: theme.color.textOnPrimary,
    height: "3.25rem"
}));


export default Nav;