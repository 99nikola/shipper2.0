import { Typography } from "@mui/material"
import Flex from "../atoms/Flex.styled"

const DivError: React.FC = (props) => {
    return (
        <Flex backgroundColor="#e8a39e" color="#730800" borderRadius="4px" padding="10px" margin="10px">
            <Typography variant="subtitle1">{props.children}</Typography>
        </Flex>
    )
}

export default DivError
