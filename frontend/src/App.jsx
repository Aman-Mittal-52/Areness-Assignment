import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  Box
} from '@chakra-ui/react';

import RouteManager from './Routes/RouteManager';

function App() {

  return (
    <Box p='10' bg='crimson'h='710px' >
      <RouteManager/>
    </Box>
  )
}

export default App
