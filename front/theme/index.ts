import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        color: {
            primary: string,
            primaryHover: string,
            primaryActive: string,
            textOnPrimary: string
        },
        iconSize: string
    }

    interface ThemeOptions {
        color: {
            primary: string,
            primaryHover: string,
            primaryActive: string,
            textOnPrimary: string
        },
        iconSize: string
    }
}

const theme = createTheme({
    color: {
        primary: "rgb(167, 132, 119)",
        primaryHover: "rgb(124, 103, 96)",
        primaryActive: "rgb(134, 119, 115)",
        textOnPrimary: "whitesmoke"
    },
    iconSize: "1.5rem"
});

export default theme;