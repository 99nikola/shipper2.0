import type { NextPage } from 'next'
import Slider from '../components/templates/Slider';
import useSlider from '../hooks/useSlider';

interface HomeProps {
	items: any[]
}

const Home: NextPage<HomeProps> = (props) => {

	const [ items, handleLeft, handleRight ] = useSlider({
		items: props.items || [],
		visible: 4
	});

	return (
		<Slider 
			items={items}
			handleLeft={handleLeft}
			handleRight={handleRight}
		/>		
	);
}

export default Home;