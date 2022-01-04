import Head from "next/head";

const RobotFont: React.FC = (props) => {
    return (
    <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="yes" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet" /> 
        </Head>
        <main>
            {props.children}
        </main>
    </>
    );
}

export default RobotFont;