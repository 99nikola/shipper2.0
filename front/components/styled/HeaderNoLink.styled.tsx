import { styled } from "@mui/material";

const HeaderNoLink = styled("div")(({ theme }) => ({ 
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: ".25rem",
    fontSize: "2rem",
    borderRadius: "0.25rem",
    height: "calc(100% - 0.5rem)",
    alignSelf: "center",
    paddingLeft: "0.325rem",
    paddingRight: "0.325rem",
    cursor: "pointer",
    position: "relative",
    color: theme.color.textOnPrimary,
    "&:hover": {
        backgroundColor: theme.color.primaryHover
    },
    "&:active" : {
        backgroundColor: theme.color.primaryActive
    }
}));

export default HeaderNoLink;