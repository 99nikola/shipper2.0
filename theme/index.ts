import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        color: {
            primary: string,
            primaryHover: string,
            primaryActive: string,
            textOnPrimary: string,
            secondary: string,
            secondaryHover: string
        },
        iconSize: string
    }

    interface ThemeOptions {
        color: {
            primary: string,
            primaryHover: string,
            primaryActive: string,
            textOnPrimary: string,
            secondary: string,
            secondaryHover: string
        },
        iconSize: string
    }
}

const theme = createTheme({
    color: {
        primary: "rgb(167, 132, 119)",
        primaryHover: "rgb(124, 103, 96)",
        primaryActive: "rgb(134, 119, 115)",
        textOnPrimary: "whitesmoke",
        secondary: "#32527b",
        secondaryHover: "#1B3D81"
    },
    iconSize: "1.5rem"
});

export default theme;