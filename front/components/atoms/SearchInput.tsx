import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { BsSearch } from "react-icons/bs"
import Flex from "./Flex.styled"
import InputField from "./InputField"

const SearchInput: React.FC = () => {
    const theme = useTheme() as Theme;
    return (
        <Flex alignItems="center">
            <BsSearch style={{
                position: "relative",
                left: "30px",
                color: "black",
                zIndex: 1,
                fontSize: theme.iconSize
            }}/>
            <InputField
                label="Search"
                size="small"
                color="primary"
                padding="0 20px"
            />
        </Flex>
    )
}

export default SearchInput
