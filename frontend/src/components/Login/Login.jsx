import { Box, Button, Flex, Heading, Image, Link, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import CustomInput from '../signUp/CustomInput'
import { FaLock } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { RiTwitterXLine } from "react-icons/ri";

import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toast = useToast()
    const navigate = useNavigate();

    const handleState = (e) => {
        switch (e.target.name) {
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

    const handleLogin = async (e) => {
        try {
            const res = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })


            const data = await res.json()

            console.log(data)

            if (data.token) {
                toast({
                    title: 'Login Successful',
                    description: `you will be redirected to dashboard`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })

                cookie.set('token', data.token)

                setEmail('')
                setPassword('')

                navigate('/dashboard')
                return
            }

            toast({
                title: 'Error',
                description: data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })


        } catch (error) {
            console.log('error', error)
        }

    }

    return (
        <Box borderRadius='30px' p='10' bg='white' h='100%'>
            <Flex justify='space-between'>
                <Box w={['auto', 'full', '30%']}>
                    <Heading>Login</Heading>
                    <Flex flexDir='column' my={5}>
                        <CustomInput Icon={IoMail} placeholder='Enter Email' func={handleState} name='email' />
                        <CustomInput Icon={FaLock} placeholder='Enter password' func={handleState} name='password' />
                    </Flex>
                    <Box>
                        <input type='checkbox' id='remember' name='remember' />
                        <label htmlFor='remember'>Remember Me</label>
                    </Box>
                    <Button my={3} colorScheme='red' onClick={handleLogin}>Register</Button>
                    <Flex my='2' gap='10px' cursor='pointer' align='center'>Or Login with: <ImFacebook2 color='blue' size='20px' />    <FcGoogle size='20px' /> <RiTwitterXLine size='20px' /></Flex>
                    <Text>Don't have an account? <Link href='/signup' color='blue'>SignUp</Link></Text>
                </Box>
                <Box w='fit-content' h='500px' display={{ sm: 'none', md: 'block', lg: 'block', base: 'none' }}>
                    <Image src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" h='100%' aspectRatio='13/12' alt="" />
                </Box>
            </Flex>
        </Box>
    )
}

export default Login