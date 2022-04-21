import { Box } from '@mui/system'
import React from 'react'
import Navbar from './Navbar'

function Layout({children}:{children: JSX.Element | JSX.Element[]}) {
  return (
    <div>
        <Navbar />
        <Box  sx={{background:'#0003', height:'92vh'}}>
        {children}
        </Box>
    </div>
  )
}

export default Layout