import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'

function Home() {
    return (
        <Box bg='white' p='8' borderRadius='30px'>
            <Heading>Welcome to Areness's To-Do List</Heading>
            <Flex justify='space-around' p='10'>
                <Link href='/login'>
                    <Button colorScheme='blue'>
                        Login
                    </Button>
                </Link>
                <Link href='/signup'>
                    <Button colorScheme='green'>
                        SignUp
                    </Button>
                </Link>

            </Flex>
        </Box>
    )
}

export default Home