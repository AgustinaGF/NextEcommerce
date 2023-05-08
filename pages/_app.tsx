// pages/_app.js
import {
	ChakraProvider,
	Container,
	VStack,
	Image,
	Heading,
	Box,
	Divider,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
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
						<Image borderRadius={9999} src={"//placehold.it/128x128"}></Image>
						<Heading>Ecommerce </Heading>
					</VStack>
					<Divider marginY={10} />
					<Component {...pageProps} />
				</Container>
			</Box>
		</ChakraProvider>
	);
};

export default App;
