import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'

function NotFound() {
    return (
        <Flex justify='center' align='center' bg='white' borderRadius='30px' p='10' flexDir='column'>
            <Heading>Page not Found</Heading>
            <Link href='/' my={16}>
                <Button colorScheme='green'>
                    Go To Home
                </Button>
            </Link>
        </Flex>
    )
}

export default NotFound