import { Avatar, Divider, IconButton, Typography, Menu, MenuItem, Card } from '@mui/material';
import Box from '@mui/material/Box'
import React, { MouseEvent, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { usePagingHook } from 'src/hooks';
import { ILikeUser, IPreviewItem } from 'src/interfaces';
import { BOARD_LIST, COMMENT_LIST, LIKE_LIST } from 'src/mock';
import { useUserStore } from 'src/stores';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CommentOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material';
import { KeyboardArrowUpOutlined }from '@mui/icons-material';
import LikeListItem from 'src/components/LikeListItem';

export default function BoardDetailView() {

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  const [board, setBoard] = useState<null | IPreviewItem>(null);
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [openLike, setOpenLike] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<ILikeUser[]>([]);
  const [openComment, setOpenComment] = useState<boolean>(false);

  const { boardList, setBoardList, viewList, COUNT, pageNumber, onPageHandler } = usePagingHook(3);

  const { boardNumber } = useParams();
  const navigator = useNavigate();

  const { user } = useUserStore();

  const onMenuClickHandler = (event : MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
    setMenuOpen(true);
  }


  const onMenuCloseHandler = () => {
    setAnchorElement(null);
    setMenuOpen(false);
  }

  useEffect( () => {
    //? boardNumber 존재 검증
    if(!boardNumber){
      navigator('/');
      return;
    }

    //? BOARD_LIST에서 boardNumber에 해당하는 board를 가져옴
    const board = BOARD_LIST.find((boardItem) => boardItem.boardNumber === parseInt(boardNumber));

    //? 검색 결과가 존재하는지 검증
    if(!board) {
      navigator('/');
      return;
    }
    
    setLikeList(LIKE_LIST);

    const owner = user !== null && user.nickname === board.writerNickname;
    setMenuFlag(owner);
    setBoard(board);

    setBoardList(COMMENT_LIST);
  }, [])

  return (
    <Box sx = {{ p : '100px 220px'}}>
      <Box>
        <Box>
          <Typography sx = {{ fontSize : '32px', fontWeight : 500}}>{board?.boardTitle}</Typography>
          <Box sx = {{ mt : '20px', display : 'flex', justifyContent : 'space-between'}}>
            <Box sx = {{ display : 'flex', alignItems : 'center'}}>
             <Avatar src = {board?.writerProfile} sx = {{ height : '32px', width : '32px', mr : '8px'}}/>
             <Typography sx = {{ mr : '8px', fontSize : '16px', fontWeight : 500}}>{board?.writerNickname}</Typography>
             <Divider sx = {{ mr : '8px'}} orientation = 'vertical' variant = 'middle' flexItem/>
             <Typography sx = {{ fontSize : '16px', fontWeight : 400, opacity : 0.4}}>{board?.writeDate}</Typography>
            </Box>

          {menuFlag && ( <IconButton onClick = {(event) => onMenuClickHandler(event)}>
            <DragIndicatorIcon/>
          </IconButton>)}

          <Menu anchorEl = {anchorElement} open = {menuOpen} onClose = {onMenuCloseHandler}>
            <MenuItem sx = {{ p : '10px 59px', opacity : 0.5}} onClick = {()=> navigator(`/board/update/${board?.boardNumber}`)}>수정</MenuItem>
            <Divider/>
            <MenuItem sx = {{ p : '10px 59px', color : '#ff0000'}}>삭제</MenuItem>
          </Menu>
          </Box> 
        </Box>
      
      <Divider sx = {{ mr : '40px 0px'}}/>
      <Box>
        <Typography sx = {{ fontSize : '18px', fontWeight : 500, oppcity: 0.5}}>{board?.boardContent}</Typography>
        {board?.img && (<Box sx = {{ width : '100%', mt : '20px'}} component = 'img' src = {board?.img}/>)}
      </Box>
      <Box sx = {{ display : 'flex', mt : '20px'}}>
        <Box sx = {{ mr : '20px', display : 'flex'}}>
          {likeStatus ? 
              (<FavoriteOutlinedIcon sx = {{hegiht : '24px', width : '24px', opacity : 0.8, mr : '6px', color : '#FF7534'}} onClick = {() => setLikeStatus(!likeStatus)}/>)
              :
              (<FavoriteBorderIcon sx = {{height : '24px', width : '24px', opacity : 0.8, mr : '6px'}} onClick = {() => setLikeStatus(!likeStatus)}/>)
          }

          <Typography sx = {{ fontSize : '16px', fontWeight : 500, opacity : 0.8, mr : '6px'}}>좋아요 {board?.likeCount}</Typography>
          <IconButton sx = {{ height : '24px', width : '24px'}} onClick = {() => setOpenLike(!openLike)}>
              {openLike ? (<KeyboardArrowUpOutlined/>) : (<KeyboardArrowDownOutlined/>)}
          </IconButton>
        </Box>
        <Box sx = {{ display : 'flex'}}>
          <CommentOutlined sx = {{ height : '24px', width : '24px', mr : '6px', opacity : 0.7}}/>
          <Typography sx = {{ fontSize : '16px', fontWeight : 500, opacity : 0.7, mr : '6px'}}>댓글 {board?.commentCount}</Typography>
          <IconButton sx = {{ height : '24px', width : '24px'}} onClick = {() => setOpenComment(!openComment)}>
            {openComment ? (<KeyboardArrowUpOutlined/>) : (<KeyboardArrowDownOutlined/>)}
          </IconButton>
        </Box>
      </Box>
    </Box>

    {openLike && 
      (<Box sx = {{ mt : '20px'}}>
        <Card variant = 'outlined' sx = {{ p : '20px'}}>
          <Typography>좋아요 {board?.likeCount}</Typography>
          <Box sx = {{ m : '20px 0px', display : 'table'}}>
             {likeList.map((likeUser) => (<LikeListItem likeUser = {likeUser}/>))}
          </Box>
        </Card>
      </Box> )}

      <Box>
        {
          openComment && (

            <Box>

              <Box>
                <Typography>댓글 {boardList.length}</Typography>
              </Box>


            </Box>
          )

        }

      
      
      </Box> 
    </Box>
  )
  
}
