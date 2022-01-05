import styled from "@emotion/styled";


interface FlexProps {
    direction?: "column" | "row",
    gap?: string,
    width?: string | number,
    border?: string,
    justifyContent?: string,
    alignItems?: string,
    margin?: string,
    backgroundColor?: string,
    color?: string,
    borderRadius?: string,
    padding?: string
}

const Flex = styled("div", {
    shouldForwardProp: (prop) => prop !== "direction" && prop !== "justifyContent" && prop !== "alignItems" && prop !== "backgroundColor" && prop !== "borderRadius"
})<FlexProps>(({ direction, gap, width, border, justifyContent, alignItems, margin, backgroundColor, color, borderRadius, padding }) => ({
    display: "flex",
    flexDirection: direction,
    width,
    gap,
    border,
    alignItems,
    justifyContent,
    margin,
    backgroundColor,
    color,
    borderRadius,
    padding
}));

Flex.defaultProps = {
    direction: "row"
}

export default Flex;