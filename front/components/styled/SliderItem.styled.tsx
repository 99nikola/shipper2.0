import { styled } from "@mui/material";

const SliderItem: React.FC = (props) => {
    return (
        <div>
            <SliderItemContainer>
                {props.children}
            </SliderItemContainer>
        </div>
    )
}

const SliderItemContainer = styled("div")({
    position: "relative"
});


export default SliderItem;