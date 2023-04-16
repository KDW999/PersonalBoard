import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { ILikeUser } from 'src/interfaces';
import Liky from 'src/interfaces/Liky.interface';

interface Props {
   likeUser : Liky;
}

export default function LikeListItem({likeUser} : Props) {
  return (
    <Box sx = {{ display : 'inline-flex', allignItems : 'center', mr : '30px'}}>
        <Avatar sx = {{ height : '32px', width : '32px', mr : '8px'}} src = {likeUser?.userProfileUrl ? likeUser.userProfileUrl : ''}/>
        <Typography component = 'span' sx = {{ fontSize : '16px', fontWeight : 500}}>{likeUser?.userNickname}</Typography>
    </Box>
  )
}
