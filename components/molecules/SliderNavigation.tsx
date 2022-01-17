import { ButtonGroup } from "@mui/material";
import { memo } from "react";
import Button from "../atoms/Button";
import { ArrowLeft, ArrowRight } from "../styled/Arrows.syled";

interface SliderNavigationProps {
    slideLeft: () => void,
    slideRight: () => void,
    leftDisabled?: boolean,
    rightDisabled?: boolean
}

const SliderNavigation: React.FC<SliderNavigationProps> = (props) => {
    return (
        <ButtonGroup>
            <Button
                onClick={props.slideLeft}
                disabled={props.leftDisabled}
            >
                <ArrowLeft size="2.5rem" />
            </Button>

            <Button
                onClick={props.slideRight}
                disabled={props.rightDisabled}
            >
                <ArrowRight size="2.5rem" />
            </Button>
        </ButtonGroup>
    )
}

export default memo(SliderNavigation);