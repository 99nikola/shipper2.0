import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type InputFieldProps = TextFieldProps & {
}

const InputField: React.FC<InputFieldProps> = forwardRef((props, ref) => {
    return (
        <TextField ref={ref} {...props}>
            {props.children}
        </TextField>
    );
});

InputField.defaultProps = {
    variant: "outlined"
}

export default InputField;