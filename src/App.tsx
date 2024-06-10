import { Center, Flex, Heading, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom";

function App() {
	return (
		<Flex direction="row" flex="1" align="center" justify="center" textColor="mediumseagreen">
			<Center backgroundColor="white" maxW="1g" w="1g" shadow="1g" rounded="md" border="2px solid mediumseagreen">
				<Stack spacing="2" pt="8" pb="8" pl="8" pr="8">
					<Center><Heading fontSize="2xl"><Link to="/login">Sign in</Link></Heading></Center>
					<Center><Heading fontSize="2xl"><Link to="/register">Sign up</Link></Heading></Center>
				</Stack>
			</Center>
		</Flex>
	)
}

export default App;
