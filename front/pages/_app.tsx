import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RobotFont from '../components/layouts/RobotFont';
import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from '../components/layouts/Navbar';
import theme from "../theme";
import { ThemeProvider } from '@emotion/react';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
	<>
		<RobotFont />
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Navbar>
					<Component {...pageProps} />
				</Navbar>
			</ThemeProvider>
		</Provider>
	</>
	);
}

export default MyApp;