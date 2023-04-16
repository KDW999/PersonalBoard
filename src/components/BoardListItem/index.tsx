// rfc 메서드 완성 기능은 ES7 + React/... 확장자 설치 후 사용 가능
import { Avatar, Box, Card, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GetListResponseDto, GetMyListResponseDto, GetSearchListResponseDto } from 'src/apis/response/board';
import { Board, IPreviewItem } from 'src/interfaces';

interface Props{
 item : GetListResponseDto | GetSearchListResponseDto | GetMyListResponseDto;
} // IPreviewItem에 담아놓은 데이터 가져와서 item이란 이름으로 사용하기

// 게시물 리스트 만드는 곳
export default function BoardListItem({ item } : Props) {

  const navigator = useNavigate();

  return (
    // 카드 안에 박스 담기
   <Card variant = 'outlined'>
    {/* 눌렀을 때 작동 */}
      <CardActionArea sx = {{ display : 'flex', justifyContent : 'space-between', p : '24px', backgroundColor : '#7fff00'}} onClick = {() => navigator(`/board/Detail/${item.boardNumber}`)}>
       {/* 보이는 게시물에 제목이나 내용 등 넣는 곳 */}
        <Box>
          <Box sx = {{ display : 'flex'}}>
            <Box sx = {{ margin : '8px'}}>
               <Avatar alt = {item.writerNickname} src = {item.writerProfileUrl ? item.writerProfileUrl : ''}/>
            </Box>
            <Box>
              <Typography sx = {{ fontSize : '12px', fontWeight : 500, color : '#000000'}}>{item.writerNickname}</Typography>
              <Typography sx = {{ mt : '2px', fontSize : '12px', fontWeight : 400, color : 'rgba(0, 0, 5, 0.7)'}}>{item.boardWriteDatetime}</Typography>
            </Box>
          </Box>

          <Box sx = {{ mt : '16px', mb : '16px'}}>
              <Typography sx = {{ fontSize : '16px', fontWeight : 500, color : '#000000'}}>{item.boardTitle}</Typography>
              <Typography sx = {{ mt : '5px', fontSize : '12px', fontWeight : 400, color : 'rgba(0, 0, 3, 0.7)'}}>{item.boardContent}</Typography>
          </Box>

          <Box>
            <Typography sx = {{fontSize : '12px', fontWeight : '400', color : 'rgba(0, 0, 0, 0.7)'}}>{`댓글 ${item.commentCount} | 좋아요 ${item.likeCount} | 조회수 ${item.viewCount}`}</Typography>
          </Box>
        </Box>
         {item.boardImgUrl && (
          <Box>
            <Box component = 'img' src = {item.boardImgUrl} sx = {{ height : '152px', width : '152px', borderRadius : '5.0$'}}/>
          </Box>
         )}
      </CardActionArea>
   </Card>
  
   )
}

