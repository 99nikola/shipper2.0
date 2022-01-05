import { styled } from "@mui/material";
import Flex from "../atoms/Flex.styled";

const Nav = styled(Flex)(({ theme }) => ({
    backgroundColor: theme.color.primary,
    color: "white",
}));


export default Nav;