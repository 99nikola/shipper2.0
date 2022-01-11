import { useMemo } from "react";
import { ISliderItem } from "../../typescript";
import Flex from "../styled/Flex.styled";

export interface SliderItemsProps {
    items: ISliderItem[]
}

const SliderItems: React.FC<SliderItemsProps> = (props) => {

    const Items = useMemo(() => (
        props.items.map((item, i) => (
            <img  
                key={i}
                src={item.src}
            />
        ))
    ), [props.items]);

    return (
        <Flex>
            {Items}
        </Flex>
    );
}

export default SliderItems;