import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { BsSearch } from "react-icons/bs"
import Flex from "../styled/Flex.styled"
import InputField from "./InputField"

const SearchInput: React.FC = () => {
    const theme = useTheme() as Theme;
    return (
        <Flex alignItems="center" position="relative">
            <BsSearch style={{
                position: "absolute",
                left: ".5rem",
                color: "black",
                zIndex: 1,
                fontSize: theme.iconSize
            }}/>
            <InputField
                label="Search"
                size="small"
                color="primary"
                padding="0 0 0 1.5rem"
            />
        </Flex>
    )
}

export default SearchInput
