import type { GetStaticProps, NextPage } from 'next'
import Slider from '../components/templates/Slider';
import useSlider from '../hooks/useSlider';

interface HomeProps {
	photos: any[],
}

const Home: NextPage<HomeProps> = (props) => {

	const [ items, handleLeft, handleRight ] = useSlider({
		items: props.photos || [],
		visible: 4
	});

	return (
		<Slider 
			items={items}
			handleLeft={handleLeft}
			handleRight={handleRight}
			render={photo => (
				<img 
					src={photo.thumbnailUrl}
				/>
			)}
		/>		
	);
}

export const getStaticProps: GetStaticProps = async () => {

	const photos = await fetch("https://jsonplaceholder.typicode.com/photos").then(res => res.json());

	return ({
		props: {
			photos: photos
		}
	});
}

export default Home;