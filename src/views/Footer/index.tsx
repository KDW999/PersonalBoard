import { Facebook, Instagram } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Box sx = {{ p : '40px 120px 50px 120px', height : '150px', backgroundColor : '#373737'}}>
        <Box sx = {{ display : 'flex', justifyContent : 'space-between'}}>
            <Box>
                <Typography sx = {{ fontSize : '20px', fontWeight : 400, color : '#ffffff'}}>KDW's Board</Typography>
            </Box>

            <Box>
                <Typography component= 'span' sx = {{ fontSize : '14px', fontWeight : 400, color : '#ffffff'}}>hide4321@naver.com</Typography>
                <IconButton>
                    <Instagram sx = {{ color : '#ffffff'}}/>
                </IconButton>
                <IconButton>
                    <Facebook sx = {{ color : '#ffffff'}}/>
                </IconButton>
            </Box>
        </Box>

        <Typography sx = {{ fontSize : '14px', fontWeight : 400, color : '#ffffff'}}>Copyright @ 2023 kokkiri. All Rights Reserved.</Typography>
    </Box>
  )
}
