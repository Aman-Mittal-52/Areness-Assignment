import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { GoBellFill } from 'react-icons/go'
import { SlCalender } from "react-icons/sl";
function Dashboard() {

    const [date, setDate] = useState('')
    const [dayname, setDayname] = useState('')

    const token = cookie.get('token')
    const toast = useToast();

    const navigate = useNavigate();


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

useEffect(()=>{
    getDate()
},[])

    return (
        <Flex flexDir='column' bg='white' borderRadius='30px' p='10'>
            <Flex justify='space-between'>
                <Heading>
                    <Flex>
                        <Text color='crimson'>Dash</Text>board
                    </Flex>
                </Heading>
                <InputGroup w='20%'>
                    <Input placeholder='search task...' />
                    <InputRightElement bg='crimson' color='#fff' borderRadius='10%'>
                        <FaSearch />
                    </InputRightElement>
                </InputGroup>

                <Flex gap='20px'>
                    <Button colorScheme='red'><GoBellFill /></Button>
                    <Button colorScheme='red'><SlCalender /></Button>
                </Flex>

                <Flex align='center' bg='#e1e1e1' _hover={{bg:'#ded4d4'}} px={6} py={1} borderRadius='10px' flexDir='column'>
                    <Text>{dayname}</Text>
                    <Text>{date}</Text>
                </Flex>
            </Flex>
        </Flex>
    )

}

export default Dashboard