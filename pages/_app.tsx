// pages/_app.js
import {
	ChakraProvider,
	Container,
	VStack,
	Image,
	Heading,
	Box,
	Divider,
	Text,
	Link
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import Head from "next/head";
import icon from '../assets/icon/favicon.ico'
import { INFORMATION } from "../app/constants";
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
		<Head>
			<title>Ecommerce</title>
			<link rel="shortcut icon"  type="image/x-icon" href="/favicon.ico"/>
			<meta content="initial-scale=1.0, width=device-width" name="viewport"></meta>
			<meta name="author" content="AgustinaGF" />
			<meta name="copyright" content="Agustina Gomez Fernandez" />
		</Head>
		<ChakraProvider theme={theme}>
			<Box padding={4}>
				<Container
					backgroundColor={"white"}
					boxShadow="md"
					marginY={4}
					maxWidth="container.xl"
					padding={4}
					borderRadius="sm"
				>
					<VStack>
						<Image
							borderRadius={9999}
							width={128}
							height={128}
							src={
								INFORMATION.avatar
							}
							alt="catImage"
						></Image>
						<Heading>{INFORMATION.title} </Heading>
					</VStack>
					<Divider marginY={10} />
					<Component {...pageProps} />
					<Divider marginY={10}/>
					<Text textAlign="center">
						@Copyright {new Date().getFullYear()}.
						<Link isExternal href="https://www.linkedin.com/in/agustina-gomez-fernandez/">Agustina Gomez Fernandez</Link>
						| All Rights reserved
					</Text>
				</Container>
			</Box>
		</ChakraProvider>
		</>
	);
};

export default App;
