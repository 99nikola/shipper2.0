import { styled, TextField, TextFieldProps } from "@mui/material";

type InputFieldProps = TextFieldProps & {
    padding?: string
}


const InputField = styled(TextField, {
    shouldForwardProp: prop => prop !== "textColor"
})<InputFieldProps>(({ theme, padding }) => ({
    backgroundColor: "white",
    borderRadius: "0.25rem",
    "& .MuiOutlinedInput-root": {  
        padding,
        "&:hover fieldset": {
            borderColor: theme.color.primaryActive
        },
        '&.Mui-focused fieldset': { 
            borderColor: theme.color.primaryHover,
        }
    },
    label: {
        padding
    }
}));

InputField.defaultProps = {
    variant: "outlined"
}

export default InputField;