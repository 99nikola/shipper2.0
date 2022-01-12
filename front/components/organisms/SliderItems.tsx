import { useMemo } from "react";
import { ISliderItem } from "../../typescript";
import SliderContainer from "../styled/SliderContainer.styled";
import SliderItem from "../styled/SliderItem.styled";

export interface SliderItemsProps {
    items: ISliderItem[],
    render: (item: ISliderItem) => React.ReactElement
}

const SliderItems: React.FC<SliderItemsProps> = (props) => {

    const Items = useMemo(() => (
        props.items.map(item => (
            <SliderItem key={item.id}>
                {props.render(item)}
            </SliderItem>
        ))
    ), [props.items]);

    return (
        <SliderContainer>
            {Items}
        </SliderContainer>
    );
}

export default SliderItems;