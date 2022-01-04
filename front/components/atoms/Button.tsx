import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = MuiButtonProps & {
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <MuiButton {...props}>
            {props.children}
        </MuiButton>
    );
}

Button.defaultProps = {
    variant: "contained"
}

export default Button;