import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text, useToast, Avatar, VStack, HStack, Progress, CircularProgress, CircularProgressLabel, IconButton, Spacer } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { GoBellFill } from 'react-icons/go'
import { SlCalender } from "react-icons/sl";
import { FiMenu } from 'react-icons/fi';
function Dashboard() {

    const [date, setDate] = useState('')
    const [dayname, setDayname] = useState('')

    const token = cookie.get('token')
    const toast = useToast();

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    function getDate() {
        const today = new Date();

        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        setDayname(dayName)
        setDate(`${day}/${month}/${year}`)
    }

    if (!token) {
        toast({
            title: 'Authentication Required',
            description: 'Please login to access your dashboard.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
        navigate('/login')
        return
    }

    const handleLogout = () => {
        cookie.remove('token')
        localStorage.removeItem('email')
        navigate('/login')
        toast({
            title: 'Logged Out',
            description: 'You have successfully logged out.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }

    useEffect(() => {
        getDate()
        setEmail(localStorage.getItem('email'))
    }, [])

    return (
        <Flex flexDir='column' bg='white' borderRadius='30px' p='10'>
            <Flex justify='space-between' align='center' p='6' borderRadius='10px' bg='#ded4d4'>
                <Heading>
                    <Flex>
                        <Text color='crimson'>Dash</Text>board
                    </Flex>
                </Heading>
                <InputGroup w='30%' bg='#fff' borderRadius='10px'>
                    <Input placeholder='search task...' />
                    <InputRightElement bg='crimson' color='#fff' borderRadius='10px'>
                        <FaSearch />
                    </InputRightElement>
                </InputGroup>

                <Flex gap='20px'>
                    <Button colorScheme='red'><GoBellFill /></Button>
                    <Button colorScheme='red'><SlCalender /></Button>
                </Flex>

                <Flex align='center' bg='#fff' _hover={{ bg: '#efe5e5' }} px={6} py={1} borderRadius='10px' flexDir='column'>
                    <Text>{dayname}</Text>
                    <Text>{date}</Text>
                </Flex>
            </Flex>
            <Flex my={4} direction={{ base: 'column', md: 'row' }}>
                {/* Sidebar */}
                <Box w={{ base: '100%', md: '250px' }} bg="red.400" p={5} color="white">
                    <Flex alignItems="center" mb={6}>
                        <Avatar name="Sundar Gurung" src="https://bit.ly/broken-link" size="lg" />
                        <VStack align="left" ml={4}>
                            <Text>Sundar Gurung</Text>
                            <Text fontSize="sm">{email}</Text>
                        </VStack>
                    </Flex>
                    {/* Sidebar Links */}

                    <VStack spacing={4} align="start">
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} fontWeight="bold">Dashboard</Button>
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} >Vital Task</Button>
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} >My Task</Button>
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} >Task Categories</Button>
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} >Settings</Button>
                        <Button colorScheme='red' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} >Help</Button>
                        <Button colorScheme='blackAlpha' w='100%' _hover={{ bg: '#e1e1e1', color: 'black' }} onClick={handleLogout} >Logout</Button>
                    </VStack>
                </Box>

                {/* Main Content */}
                <Box flex="1" bg="gray.50" p={6}>
                    <Flex alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold">
                            Welcome back, Sundar 👋
                        </Text>
                        <Spacer />
                        <IconButton icon={<FiMenu />} display={{ md: 'none' }} />
                    </Flex>

                    {/* Task Section */}
                    <Flex mt={6} flexDir={['column', 'column', 'column', 'row']} spacing={4}>
                        <Box w={{ base: '100%' }} p={4} bg="white" borderRadius="lg" shadow="md">
                            <Text fontWeight="bold" fontSize="xl">To-Do</Text>

                            <VStack mt={4} spacing={3}>
                                {/* Task 1 */}
                                <Box p={4} bg="gray.100" borderRadius="lg" w="full">
                                    <Text fontWeight="bold">Attend Nischal's Birthday Party</Text>
                                    <Text fontSize="sm">Buy gifts and pick up the cake. (6 PM)</Text>
                                    <HStack mt={2} justifyContent="space-between">
                                        <Text fontSize="sm">Priority: Moderate</Text>
                                        <Text fontSize="sm" color="red.500">Status: Not Started</Text>
                                    </HStack>
                                </Box>

                                {/* Task 2 */}
                                <Box p={4} bg="gray.100" borderRadius="lg" w="full">
                                    <Text fontWeight="bold">Landing Page Design for TravelDays</Text>
                                    <Text fontSize="sm">Get work done by EOD. (4 PM)</Text>
                                    <HStack mt={2} justifyContent="space-between">
                                        <Text fontSize="sm">Priority: Moderate</Text>
                                        <Text fontSize="sm" color="blue.500">Status: In Progress</Text>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Box>

                        {/* Task Status */}
                        <Box w='100%' p={4} bg="white" borderRadius="lg" shadow="md" ml={{ lg: 4, md: 0 }} mt={{ base: 0, md: 2 }}>
                            <Text fontWeight="bold" fontSize="xl">Task Status</Text>

                            {/* Status Progress */}
                            <HStack mt={4} justifyContent="space-around">
                                <VStack>
                                    <CircularProgress value={84} color="green.400">
                                        <CircularProgressLabel>84%</CircularProgressLabel>
                                    </CircularProgress>
                                    <Text>Completed</Text>
                                </VStack>
                                <VStack>
                                    <CircularProgress value={46} color="blue.400">
                                        <CircularProgressLabel>46%</CircularProgressLabel>
                                    </CircularProgress>
                                    <Text>In Progress</Text>
                                </VStack>
                                <VStack>
                                    <CircularProgress value={13} color="red.400">
                                        <CircularProgressLabel>13%</CircularProgressLabel>
                                    </CircularProgress>
                                    <Text>Not Started</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

        </Flex>
    )

}

export default Dashboard