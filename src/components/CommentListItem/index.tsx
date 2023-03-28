import { Avatar, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { ICommentItem } from 'src/interfaces'

interface Props {
    item : ICommentItem
}

export default function CommentListItem( {item} : Props) {

    const dateGap = Date.now() - Date.parse(item.commentDatetime); // 날짜 차이??
    const before = Math.floor(dateGap / (1000 * 60));  // 분??

  return (
    <Box>
        <Box mb = '8px' display = 'flex' alignItems = 'center'>
            <Avatar sx = {{ height : '32px', width : '32px', mr : '8px'}} src = {item.commentUserPrfoile}/>
            <Typography>{item.commentUserNickname}</Typography>
            <Divider sx = {{ mr : '8px', ml : '8px'}} orientation = 'vertical' variant = 'middle' flexItem/>
            <Typography sx = {{ fontSize : '16px', fontWeight : 400, color : 'rgba(0, 0, 0, 0.5)'}}>{before}분 전</Typography>
        </Box>
        <Typography sx = {{ fontSize : '18px', fontWeight : 500, lineHeight : '150%', color : 'rgba(0, 0, 0, 0.9)'}}>{item.commentContent}</Typography>
    </Box>
  )
}
