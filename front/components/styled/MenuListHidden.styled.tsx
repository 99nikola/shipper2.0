import { styled } from "@mui/material";
import HeaderNoLink from "./HeaderNoLink.styled";


const MenuListHidden = styled("div")(({ theme }) => ({
    display: "none",

    width: "100%",
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: theme.color.primary
}));

export default MenuListHidden;