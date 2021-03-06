import { styled } from "@mui/material";
import { IconBaseProps } from "react-icons";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";


export const ArrowLeft = styled(HiArrowCircleLeft, {
    shouldForwardProp: prop => prop !== "size"
})<IconBaseProps>(({ size }) => ({
    fontSize: size
}));


export const ArrowRight = styled(HiArrowCircleRight, {
    shouldForwardProp: prop => prop !== "size"
})(({ size }) => ({
    fontSize: size
}));