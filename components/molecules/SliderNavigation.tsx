import { ButtonGroup } from "@mui/material";
import { memo } from "react";
import { TorB } from "../../typescript";
import Button from "../atoms/Button";
import { ArrowLeft, ArrowRight } from "../styled/Arrows.syled";

interface SliderNavigationProps {
    slideLeft: TorB
    slideRight: TorB
}

const SliderNavigation: React.FC<SliderNavigationProps> = (props) => {
    return (
        <ButtonGroup>
            <Button
                onClick={props.slideLeft}>
                <ArrowLeft size="2.5rem" />
            </Button>

            <Button
                onClick={props.slideRight}
            >
                <ArrowRight size="2.5rem" />
            </Button>
        </ButtonGroup>
    )
}

export default memo(SliderNavigation);