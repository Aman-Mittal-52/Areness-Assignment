import React, { useState } from 'react'

import { FaUserEdit, FaUserAlt, FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    Link as ChakraLink,
    useToast
} from '@chakra-ui/react'

import { Link as RouteLink, useNavigate } from 'react-router-dom'

import CustomInput from './CustomInput'

function SignUp() {

    const [username, setUsername] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toast = useToast();

    const navigate = useNavigate()

    const handleState = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break
            case 'lastname':
                setLastname(e.target.value)
                break
            case 'firstname':
                setFirstname(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    const handleSignUp = async (e) => {
        try {
            const res = await fetch('http://localhost:4000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    lastname,
                    firstname,
                    email,
                    password
                })
            })

            localStorage.setItem('firstname',firstname)


            const data = await res.json()

            toast({
                title: 'Registration Successful',
                description: `Welcome ${firstname} ${lastname}!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            setUsername('')
            setPassword('')
            setFirstname('')
            setLastname('')
            setEmail('')

            navigate('/login')


        } catch (error) {
            console.log('error', error)
        }

    }

    return (
        <Flex p='6' bg='white' borderRadius='30px'>
            <Box w='fit-content' h='500px' display={{ sm: 'none', lg: 'block', base: 'none' }}>
                <Image src="https://hibahbansos.cirebonkab.go.id/assets/login/images/login.jpg" h='100%' aspectRatio='13/12' alt="" />
            </Box>
            <Box m='auto' w='full' px='20'>
                <Heading py='8'>SignUp</Heading>
                <Flex flexDir='column'>

                    <CustomInput placeholder='Enter First Name' Icon={FaUserEdit} func={handleState} name='firstname' />
                    <CustomInput placeholder='Enter Last Name' Icon={FaUserEdit} func={handleState} name='lastname' />
                    <CustomInput placeholder='Enter Username' Icon={FaUserAlt} func={handleState} name='username' />
                    <CustomInput placeholder='Enter Email' Icon={IoMail} func={handleState} name='email' />
                    <CustomInput placeholder='Enter Password' Icon={FaLock} func={handleState} name='password' />
                    <CustomInput placeholder='Confirm Password' Icon={FaLock} func={handleState} name='password' />

                </Flex>
                <input type='checkbox' />
                <label>I aggree to all terms</label>
                <br />
                <Button my={6} colorScheme='red' onClick={handleSignUp}>Register</Button>
                <Text>Already have an account? <ChakraLink as={RouteLink} to='/login' color='blue.300'>Login</ChakraLink></Text>

            </Box>
        </Flex>
    )
}

export default SignUp