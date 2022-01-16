import styled from "@emotion/styled";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = NextLinkProps & {
    aElement?: boolean
}

const AStyled = styled.a({
    textDecoration: "none",
    display: "flex"
});

const Link: React.FC<LinkProps> = (props) => {
    return (
        <NextLink {...props}>
            {props.aElement 
                ?   <AStyled>
                        {props.children}
                    </AStyled>
                :   props.children
            }
        </NextLink>
    );
}

Link.defaultProps = {
    aElement: false
}


export default Link;