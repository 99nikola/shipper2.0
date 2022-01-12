import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from "@mui/material";
import theme from "../../theme";

type ButtonProps = MuiButtonProps & {
    bgColor?: "primary" | "secondary",
    borderRadius?: string
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <ButtonStyled {...props}>
            {props.children}
        </ButtonStyled>
    );
}

const btnColor = new Map([
    ["primary", {
        bgColor: theme.color.primaryHover,
        bgColorHover: theme.color.primaryActive
    }],
    ["secondary", {
        bgColor: theme.color.secondary,
        bgColorHover: theme.color.secondaryHover
    }]
]);

const ButtonStyled = styled(MuiButton, {
    shouldForwardProp: prop => prop !== "bgColor" && prop !== "borderRadius"
})<ButtonProps>(({ bgColor, borderRadius }) => {
    return ({
        backgroundColor: btnColor.get(bgColor as string)!.bgColor,
        borderRadius,
        "&:hover": {
            backgroundColor: btnColor.get(bgColor as string)!.bgColorHover
        }
    });
});

Button.defaultProps = {
    variant: "contained",
    bgColor: "secondary"
}

export default Button;