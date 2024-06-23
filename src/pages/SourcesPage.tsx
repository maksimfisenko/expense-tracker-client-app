import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Heading, IconButton, Link, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const sources = [
    { id: 1, name: 'Bank Account', balance: 5000, currency: 'EUR', color: '#FF5733' },
    { id: 2, name: 'Wallet', balance: 150, currency: 'USD', color: '#33FF57' },
    { id: 3, name: 'Savings', balance: 3000, currency: 'TRY', color: '#3357FF' },
    { id: 4, name: 'Savings2', balance: 3000, currency: 'TRY', color: '#3357FF' },
];

const exchangeRates = {
    EUR: 1.1,
    USD: 1.0,
    TRY: 0.045,
};

function formatBalance(balance: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(balance);
}

function convertToUSD(balance: number, currency: string): number {
    const rate = exchangeRates[currency as keyof typeof exchangeRates];
    return balance * rate;
}

function handleEdit(id: number): void {
    alert(`Edit source with id ${id}`);
}

function handleDelete(id: number): void {
    alert(`Delete source with id ${id}`);
}

const SourcesPage: React.FC = () => {

    const totalUSD = sources.reduce((total, source) => total + convertToUSD(source.balance, source.currency), 0);

    const data = {
        labels: sources.map(source => source.name),
        datasets: [
            {
                label: 'Account Balances in USD',
                data: sources.map(source => convertToUSD(source.balance, source.currency)),
                backgroundColor: sources.map(source => source.color),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        cutout: '70%',
        legend: {
            display: false,
        },
    };

    return (
        <Box bg="white" color="mediumseagreen" minH="100vh" w="100%">
            <Flex as="nav" p="1rem" borderBottom="2px" borderColor="mediumseagreen">
                <Heading as="h1" size="md" mr="2rem" sx={{ userSelect: 'none' }}>Expense Tracker</Heading>
                <Link href="/expenses" mx="1rem" _hover={{ bg: "mediumseagreen", color: "white" }}>Expenses</Link>
                <Link href="/income" mx="1rem" _hover={{ bg: "mediumseagreen", color: "white" }}>Income</Link>
                <Link href="/statistics" mx="1rem" _hover={{ bg: "mediumseagreen", color: "white" }}>Statistics</Link>
                <Link href="/profile" mx="1rem" _hover={{ bg: "mediumseagreen", color: "white" }}>My Profile</Link>
            </Flex>

            <Box textAlign="center" py="2rem">
                <Heading as="h2">Sources</Heading>
            </Box>

            <Flex p="2rem" direction={{ base: "column", lg: "row" }} flex="1">
                <Box flex="1">
                    {sources.map((source) => (
                        <Flex
                            key={source.id}
                            bg="white"
                            color="mediumseagreen"
                            borderLeft={`6px solid ${source.color}`}
                            p="1rem"
                            mb="1rem"
                            direction="column"
                            align="left"
                        >
                            <VStack align="left">
                                <HStack spacing="0.5rem">
                                    <Text fontSize="lg" fontWeight="bold">{source.name}</Text>
                                    <IconButton
                                        aria-label="Edit"
                                        bg="transparent"
                                        color="mediumseagreen"
                                        _hover={{ bg: "mediumseagreen", color: "white" }}
                                        icon={<EditIcon />}
                                        onClick={() => handleEdit(source.id)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        bg="transparent"
                                        color="mediumseagreen"
                                        _hover={{ bg: "mediumseagreen", color: "white" }}
                                        icon={<DeleteIcon />}
                                        onClick={() => handleDelete(source.id)}
                                    />
                                </HStack>
                                <Text>{formatBalance(source.balance, source.currency)}</Text>
                            </VStack>
                        </Flex>
                    ))}
                </Box>
                <Box flex="1" ml={{ base: 0, lg: "2rem" }} mt={{ base: "2rem", lg: 0 }} p="2rem" display="flex" justifyContent="center" alignItems="center">
                    <Doughnut data={data} options={options}/>
                </Box>
                <Box flex="1" ml={{ base: 0, lg: "2rem" }} mt={{ base: "2rem", lg: 0 }} p="2rem" display="flex" justifyContent="center" alignItems="center">
                    <Table colorScheme="green">
                        <Thead>
                            <Tr>
                                <Th fontWeight="bold" textColor="mediumseagreen">Account Name</Th>
                                <Th fontWeight="bold" textColor="mediumseagreen">Balance (Account Currency)</Th>
                                <Th fontWeight="bold" textColor="mediumseagreen">Balance (USD)</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sources.map(source => (
                                <Tr key={source.id}>
                                    <Td>{source.name}</Td>
                                    <Td>{formatBalance(source.balance, source.currency)}</Td>
                                    <Td>{formatBalance(convertToUSD(source.balance, source.currency), 'USD')}</Td>
                                </Tr>
                            ))}
                            <Tr fontWeight="bold">
                                <Td>Total</Td>
                                <Td></Td>
                                <Td>{formatBalance(totalUSD, 'USD')}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </Box>
    )
}

export default SourcesPage;
