import { styled } from "@mui/material";

const MenuListHidden = styled("div")(({ theme }) => ({
    display: "none",

    width: "100%",
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: theme.color.primaryHover,
    zIndex: 1,
    "& div:hover": {
        backgroundColor: theme.color.primary
    }
}));

export default MenuListHidden;