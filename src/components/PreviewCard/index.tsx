import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IPreviewItem } from 'src/interfaces'

interface Props{
    previewItem : IPreviewItem
}

export default function PreviewCard( {previewItem} : Props) {

  const backgroundImage = `url(${previewItem.img})`;

  const navigator = useNavigate();

  return (
    <Card>
      <CardActionArea sx = {{ height : '500px', backgroundImage : backgroundImage, backgroundSize : 'cover'}} onClick = {() => navigator(`/board/detail/${previewItem.boardNumber}`)}>
        <Box sx = {{ height : '100%', display : 'flex', flexDirection : 'column-reverse'}}>
          <Box sx = {{ p: '24px'}}>
            <Box sx = {{ display : 'flex'}}>
              <Box sx = {{ mr : '8px'}}>
                <Avatar alt = "Iron Man" src = {previewItem.writerProfile}/>
              </Box>
              <Box>
                <Typography sx = {{ fontSize : '15px', fontWeight : 700, color : '#000000'}}>{previewItem.writerNickname}</Typography>
                <Typography sx = {{ mt : '2px', fontSize : '15px', fontWeight : 600, color : 'rgba(0, 0, 0, 0.7)'}}>{previewItem.writeDate}</Typography>
              </Box>
            </Box>
            <Box sx = {{ mt : '16px', mb : '16px'}}>
              <Typography sx = {{ fontSize : '19px', fontWeight : 700, color : '#000000'}}>{previewItem.boardTitle}</Typography>
              <Typography sx = {{ mt : '5px', fontSize : '15px', fontWeight : 600, color : 'rgba(0, 0, 0, 1)'}}>{previewItem.boardContent}</Typography>
            </Box>
            <Box>
              <Typography sx = {{ fontSize : '12px', fontWeight : 400, color : 'rgba(0, 0, 0, 0.8)'}}>{`댓글 ${previewItem.commentCount} º 좋아요 ${previewItem.likeCount} º 조회수 ${previewItem.viewCount}`}</Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
