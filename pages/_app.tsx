import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from '../components/layouts/Navbar';
import theme from "../theme";
import { ThemeProvider } from '@emotion/react';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Navbar />
				<main>
					<Component {...pageProps} />
				</main>
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;