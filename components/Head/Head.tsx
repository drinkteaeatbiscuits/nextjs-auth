import Head from "next/head";

const HeadComponent = (props:any) => {

	const { title } = props;

	return <Head>
				<title>Top Gift Store</title>
				<meta name="description" content="Top Gift Store" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
			</Head>
}

export default HeadComponent