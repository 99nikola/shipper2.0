import { MdExitToApp, MdMenu } from "react-icons/md";
import { RiShoppingCart2Line, RiStore3Line } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import { FaShippingFast } from "react-icons/fa";
import Nav from "../styled/Nav.styled";
import SearchInput from "../atoms/SearchInput";
import HeaderNoLink from "../styled/HeaderNoLink.styled";
import HeaderLink from "../atoms/HeaderLink";
import { Typography } from "@mui/material";
import MenuList from "../styled/MenuList.styled";
import MenuListHidden from "../styled/MenuListHidden.styled";

const Navbar: React.FC = (props) => {
    return (
    <>
        <Nav>
            {/* <Typography variant="h4">Shipper</Typography> */}
            <HeaderNoLink>
                <MdMenu />
            </HeaderNoLink>

            <HeaderLink href="/" aElement={true} passHref={true}>    {/* TODO: href change */}
                <Typography>MyStore</Typography>
                <RiStore3Line />
            </HeaderLink>

            <HeaderLink href="/" aElement={true} passHref={true}>
                <Typography>Feed</Typography>
                <CgFeed />
            </HeaderLink>

            
            <SearchInput />

            <HeaderLink href="/" aElement={true} passHref={true}>
                <Typography>Logout</Typography>
                <MdExitToApp />
            </HeaderLink>

            <HeaderLink href="/" aElement={true} passHref={true}>
                <Typography>My Orders</Typography>
                <FaShippingFast />
            </HeaderLink>
                     
            <MenuList>
                <Typography>
                    Login or Register
                </Typography>

                <MenuListHidden>
                    <HeaderLink href="/login" aElement={true} passHref={true}>
                        <Typography>Login</Typography>
                    </HeaderLink>
                    <HeaderLink href="/register" aElement={true} passHref={true}>
                        <Typography>Register</Typography>
                    </HeaderLink>
                </MenuListHidden>
            </MenuList>
            
            <HeaderLink href="/" aElement={true} passHref={true}>
                <Typography>Cart</Typography>
                <RiShoppingCart2Line />
            </HeaderLink>

        </Nav>
        <main>{props.children}</main>
    </>
    );
}

export default Navbar;