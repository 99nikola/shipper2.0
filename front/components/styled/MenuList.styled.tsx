import { styled } from "@mui/material";
import HeaderNoLink from "./HeaderNoLink.styled";


const MenuList = styled(HeaderNoLink)(({ theme }) => ({
    display: "flex",
    "&:hover div": {
        display: "flex",
        width: "100%",
        borderRadius: "0 0 0.25rem 0.25rem"
    },
    "&:hover": {
        borderRadius: "0.25rem 0.25rem 0 0"
    }
}));

export default MenuList;