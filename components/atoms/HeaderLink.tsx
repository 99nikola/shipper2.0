import HeaderNoLink from "../styled/HeaderNoLink.styled";
import Link, { LinkProps } from "./Link";

const HeaderLink: React.FC<LinkProps> = (props) => {
    return (
        <Link {...props}>
            <HeaderNoLink>
                {props.children}
            </HeaderNoLink>
        </Link>
    );
}

export default HeaderLink;