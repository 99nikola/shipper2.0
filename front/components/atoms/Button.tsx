import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from "@mui/material";

type ButtonProps = MuiButtonProps & {
    bgColor?: "primary" | "secondary"
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <ButtonStyled {...props}>
            {props.children}
        </ButtonStyled>
    );
}

const ButtonStyled = styled(MuiButton, {
    shouldForwardProp: prop => prop !== "bgColor"
})<ButtonProps>(({ theme, bgColor }) => {

    let backgroundColor, backgroundColorHover;
    switch (bgColor) {
        case "primary":
            backgroundColor = theme.color.primaryHover;
            backgroundColorHover = theme.color.primaryActive;
            break;
        case "secondary":
            backgroundColor = theme.color.secondary;
            backgroundColorHover = theme.color.secondaryHover;
            break;
    }

    return ({
        backgroundColor,
        "&:hover": {
            backgroundColor: backgroundColorHover
        }
    });
});

Button.defaultProps = {
    variant: "contained",
    bgColor: "secondary"
}

export default Button;