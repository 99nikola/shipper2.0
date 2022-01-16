import { Html, Main, NextScript, Head } from "next/document";

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="yes" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet" /> 
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default Document;