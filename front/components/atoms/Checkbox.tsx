import { styled } from "@mui/material";
import { forwardRef } from "react";

interface CheckboxProps {
    id?: string,
    display?: string,
    onClick?: () => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    return (
        <Input 
            onClick={props.onClick}
            type="checkbox" 
            id={props.id}
            display={props.display}
            ref={ref}
        />
    );
});

const Input = styled("input")<CheckboxProps>(({ display }) => ({
    display
})); 

export default Checkbox;