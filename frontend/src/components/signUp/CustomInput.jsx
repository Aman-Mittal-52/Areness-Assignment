import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

function CustomInput({ placeholder, Icon, name, func }) {
    return (
        <InputGroup my={2}>
            <InputLeftElement>
                <Icon />
            </InputLeftElement>
            <Input placeholder={placeholder} name={name} onChange={(e) => { func(e) }} />
        </InputGroup>
    )
}

export default CustomInput