import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RobotFont from '../components/layouts/RobotFont';
import { Provider } from 'react-redux';
import { store } from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<RobotFont>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</RobotFont>
	);
}

export default MyApp;