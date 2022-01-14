import { useMemo } from "react";
import { ISliderItem } from "../../typescript";
import SliderContainer from "../styled/SliderContainer.styled";
import SliderItem from "../styled/SliderItem.styled";

interface SliderItemsProps {
    items: ISliderItem[],
    render: (item: ISliderItem) => React.ReactElement,
    specialCase: boolean
}

const SliderItems: React.FC<SliderItemsProps> = (props) => {

    const Items = useMemo(() => (
        props.items.map((item, i) => {
            let id = item.id;
            if (props.specialCase && (i==0 || i==props.items.length))
                id += ("" + i);

            return (
                <SliderItem className="slider-item" key={id}>
                    {props.render(item)}
                </SliderItem>
            );
        })), [props.items, props.render, props.specialCase]);

    return (
        <SliderContainer>
            {Items}
        </SliderContainer>
    );
}

export default SliderItems;