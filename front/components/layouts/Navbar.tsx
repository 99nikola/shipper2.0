import { MdExitToApp, MdMenu } from "react-icons/md";
import { RiShoppingCart2Line, RiStore3Line } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import InputField from "../atoms/InputField";
import Nav from "../styled/Nav.styled";
import SearchInput from "../atoms/SearchInput";

const Navbar: React.FC = (props) => {
    return (
    <>
        <Nav>
            <span>Shipper</span>
            <MdMenu />

            <span>MyStore</span>
            <RiStore3Line />

            <CgFeed />
            <span>Feed</span>

            
            <SearchInput />

            <MdExitToApp />

            <FaShippingFast />
            <span>My Orders</span>
                     
            Login
            or
            Register
            
            <label>Login</label>
            <label>Register</label>
                  
            <RiShoppingCart2Line />

        </Nav>
        <main>{props.children}</main>
    </>
    );
}

export default Navbar;