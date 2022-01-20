import type { GetStaticProps, NextPage } from "next"
import Slider from "../components/templates/Slider";
import useSlider from "../hooks/useSlider";

interface HomeProps {
	photos: any[],
}

const Home: NextPage<HomeProps> = (props) => {

	const slider = useSlider({
		items: props.photos,
		visible: 4
	});

	return (
		<Slider 
			slider={slider}
			render={item => (
				<img
					src={item.thumbnailUrl}	
					alt={item.title}
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