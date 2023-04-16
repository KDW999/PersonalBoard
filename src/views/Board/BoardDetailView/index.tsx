import React, { MouseEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';
import { Avatar, Box, Button, Card, Divider, IconButton, Input, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import { Board, Liky, Comment } from 'src/interfaces';
import { useUserStore } from 'src/stores';
import LikeListItem from 'src/components/LikeListItem';
import CommentListItem from 'src/components/CommentListItem';
import { usePagingHook } from 'src/hooks';
import { getPageCount } from 'src/utils';
import { DeleteBoardResponseDto, GetBoardResponseDto, LikeResponseDto, PostCommentResponseDto } from 'src/apis/response/board';
import ResponseDto from 'src/apis/response';
import { authorizationHeader, DELETE_BOARD_URL, GET_BOARD_URL, LIKE_URL, POST_COMMENT_URL } from 'src/constants/api';
import { LikeRequestDto, PostCommentRequestDto } from 'src/apis/request/board';
export default function BoardDetailView() {

   //          Hook          //
   const [cookies] = useCookies();

   const navigator = useNavigate();

   const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const [menuFlag, setMenuFlag] = useState<boolean>(false);

   const [board, setBoard] = useState<Board | null>(null);

   const [likeStatus, setLikeStatus] = useState<boolean>(false);
   const [openLike, setOpenLike] = useState<boolean>(false);
   const [likeList, setLikeList] = useState<Liky[]>([]);

   const [openComment, setOpenComment] = useState<boolean>(false);
   const [commentContent, setCommentContent] = useState<string>('');
   const [commentList, setCommentList] = useState<Comment[]>([]);

   const { boardList, setBoardList, viewList, COUNT, pageNumber, onPageHandler } = usePagingHook(3);

   const { boardNumber } = useParams();
   

   const { user } = useUserStore();

   const accessToken = cookies.accessToken;
   let isLoad = false;


   //? 글 쓰기
   //          Event Handler          //
   const getBoard = () => {
       axios.get(GET_BOARD_URL(boardNumber as string))
       .then((response) => getBoardResponseHandler(response))
       .catch((error) => getBoardErrorHandler(error));
   }

   //? 좋아요 누르기
   const onLikeHandler = () => {
       if(!accessToken){
           //alert('로그인 필요')
           // path : '/auth';
           return;
       }

       const data : LikeRequestDto = { boardNumber : parseInt(boardNumber as string)}

       axios.post(LIKE_URL, data, authorizationHeader(accessToken))
       .then((response) => likeResponseHandler(response))
       .catch((error) => likeErrorHandler(error))
   }

   //? 댓글 달기
   const onPostCommentHandler = () => {
       if(!accessToken){
           alert('로그인 필요');
           return;
       }

       const data : PostCommentRequestDto = { boardNumber : parseInt(boardNumber as string), 
                                       commentContent}

       axios.post(POST_COMMENT_URL, data, authorizationHeader(accessToken))
       .then((response) => (postCommentResponseHandler(response)))
       .catch((error) => (postCommentErrorHandler(error)));
   }

   //? 글 삭제
   const onDeleteHandler = () => {
       if(!accessToken){
           alert('로그인 필요');
           return;
       }

       if(board?.writerEmail !== user?.email){
           alert('권한 없음');
           return;
       }

       axios.delete(DELETE_BOARD_URL(boardNumber as string), authorizationHeader(accessToken))
       .then((response) => deleteBoardResponseHandler(response))
       .catch((error) => deleteBoardErrorHandler(error));

   }

   //? 메뉴 클릭
   const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
       setAnchorElement(event.currentTarget);
       setMenuOpen(true);
   }

   //? 메뉴 닫기
   const onMenuCloseHandler = () => {
       setAnchorElement(null);
       setMenuOpen(false);
   }
   
   //          Response Handler          //
   const getBoardResponseHandler = (response : AxiosResponse<any, any>) => {

       const { result, message, data} = response.data as ResponseDto<GetBoardResponseDto>
       if(!result || !data){
           alert(message);
           navigator('/');
           return;
       }

      setBoardResponse(data);
   }

   const postCommentResponseHandler = (response : AxiosResponse<any, any>) => {

       const { result, message, data } = response.data as ResponseDto<PostCommentResponseDto>;
       if(!result || !data){
           alert(message);
           return;
       }

       setBoardResponse(data);
       setCommentContent('');
   }

   const likeResponseHandler = (response : AxiosResponse<any, any>) => {
       const{result, data, message} = response.data as ResponseDto<LikeResponseDto>;
       if(!result || !data){
           alert(message);
           return;
       }
       setBoardResponse(data)
   }

   const deleteBoardResponseHandler = (response : AxiosResponse<any, any>) => {

       const { result, message, data} = response.data as ResponseDto<DeleteBoardResponseDto>; 
       if(!result || !data || data.resultStatus){
           alert(message);
           return;
       }
       navigator('/');
   }

   //          Error Handler          //
   const getBoardErrorHandler = (error : any) =>  console.log(error.message);
   const likeErrorHandler = (error : any) => console.log(error.message);
   const postCommentErrorHandler = (error : any) => console.log(error.message);
   const deleteBoardErrorHandler = (error : any) => console.log(error.message);

   //@ function
   const setBoardResponse = (data : GetBoardResponseDto | LikeResponseDto | PostCommentResponseDto) => {

       const { board, commentList, likeList} = data;
       setBoard(board);

       //? 댓글 리스트를 3개 까지 보여주도록 하는 LOGIC
       setBoardList(commentList);
       setLikeList(likeList);

       const owner = user !== null && board.writerEmail === user.email;
       console.log(board.writerEmail);
       setMenuFlag(owner); 

   } 

   //          Use Effect          //
   useEffect(() => {
       if(isLoad) return;

       //? boardNumber가 존재하는지 검증
       if (!boardNumber) {
           navigator('/');
           return;
       }

       isLoad = true; // useEffect() 2번 도는 거 방지하려면 변수 만들어서 빠져나가기

       //? BOARD_LIST에서 boardNumber에 해당하는 board를 가져옴
       // const board = BOARD_LIST.find((boardItem) => boardItem.boardNumber === parseInt(boardNumber));
       //? 검색한 결과가 존재하는지 검증
       // if (!board) {
       //     navigator('/');
       //     return;
       // }

       getBoard();
       // setLikeList(LIKE_LIST);
       // const owner = user !== null && user.nickname === board.writerNickname;
       // setMenuFlag(owner);
       // setBoard(board);
       // setBoardList(COMMENT_LIST);
   }, [])

   useEffect( () => {
     if(!user) return;

     const like = likeList.find((like) => like.userEmail === user.email);

     setLikeStatus(like !== undefined);
   }, [likeList])

   return (
       <Box sx={{ p: '100px 222px', whiteSpace : 'pre-wrap' }}>
           <Box>
               <Box>
                   <Typography sx={{ fontSize: '32px', fontWeight: 500 }}>{board?.boardTitle}</Typography>
                   <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'space-between' }}>
                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Avatar src={board?.writerProfileUrl ? board.writerProfileUrl : ''} sx={{ height: '32px', width: '32px', mr: '8px' }} />
                           <Typography sx={{ mr: '8px', fontSize: '16px', fontWeight: 500 }}>{board?.writerNickname}</Typography>
                           <Divider sx={{ mr: '8px' }} orientation='vertical' variant='middle' flexItem />
                           <Typography sx={{ fontSize: '16px', fontWeight: 400, opacity: 0.4 }}>{board?.boardWriteDatetime}</Typography>
                       </Box>
                       {menuFlag && (
                           <IconButton onClick={(event) => onMenuClickHandler(event)}>
                               <DragIndicatorIcon />
                           </IconButton>
                       )}
                       <Menu anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
                           <MenuItem sx={{ p: '10px 59px', opacity: 0.5 }} onClick={() => navigator(`/board/update/${board?.boardNumber}`)}>수정</MenuItem>
                           <Divider />
                           <MenuItem sx={{ p: '10px 59px', color: '#ff0000', opacity: 0.5 }} onClick = {() => onDeleteHandler()}>삭제</MenuItem>
                       </Menu>
                   </Box>
               </Box>
               <Divider sx={{ mr: '40px 0px' }} />
               <Box>
                   <Typography sx={{ fontSize: '18px', fontWeight: 500, opacity: 0.7 }}>{board?.boardContent}</Typography>
                   {board?.boardImgUrl && (<Box sx={{ width: '100%', mt: '20px' }} component='img' src={board?.boardImgUrl} />)}
               </Box>
               <Box sx={{ display: 'flex', mt: '20px' }}>
                   <Box sx={{ mr: '20px', display: 'flex' }}>
                       {likeStatus ?
                           (<FavoriteOutlinedIcon sx={{ height: '24px', width: '24px', opacity: 0.8, mr: '6px', color: '#FF0000' }} onClick={() => onLikeHandler()} />) :
                           (<FavoriteBorderIcon sx={{ height: '24px', width: '24px', opacity: 0.8, mr: '6px' }} onClick={() => onLikeHandler()} />)
                       }

                       <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.8, mr: '6px' }}>좋아요 {board?.likeCount}</Typography>
                       <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenLike(!openLike)}>
                           {openLike ? (<KeyboardArrowUpOutlinedIcon />) : (<KeyboardArrowDownOutlinedIcon />)}
                       </IconButton>
                   </Box>
                   <Box sx={{ display: 'flex' }}>
                       <CommentOutlinedIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7 }} />
                       <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.7, mr: '6px' }}>댓글 {board?.commentCount}</Typography>
                       <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenComment(!openComment)}>
                           {openComment ? (<KeyboardArrowUpOutlinedIcon />) : (<KeyboardArrowDownOutlinedIcon />)}
                       </IconButton>
                   </Box>
               </Box>
           </Box>
           {
               openLike && (
                  <Box sx={{ mt: '20px' }}>
                     <Card variant='outlined' sx={{ p: '20px' }}>
                       <Typography>좋아요 {board?.likeCount}</Typography>
                       <Box sx={{ m: '20px 0px', display: 'table' }}>
                           {likeList.map((likeUser) => (<LikeListItem likeUser={likeUser} />))}
                       </Box>
                   </Card>
                  </Box>
           )}

          {accessToken &&
           <Box>
               {
                   openComment && (
                       <Box>

                           <Box sx={{ p: '20px', mb : '30px' }}>
                               <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>댓글 {boardList.length}</Typography>
                               <Stack sx={{ p: '20px 0px' }} spacing={3.75}>
                                   {viewList.map((commentItem) => (<CommentListItem item = {commentItem as Comment}/>))}
                               </Stack>
                           </Box>

                           <Divider />
                           <Box sx={{ p: '20px 0px', display: 'flex', justifyContent: 'center' }}>
                               <Pagination page = {pageNumber} count = {getPageCount(boardList, COUNT)} onChange = {(event, value) => onPageHandler(
                               value)}/>
                           </Box>

                           <Box>
                               <Card variant='outlined' sx = {{ p :'20px'}}>
                                   <Input minRows = {3} multiline disableUnderline fullWidth value = {commentContent} onChange = {(event) => setCommentContent(event.target.value)}/>
                                   <Box sx = {{ display : 'flex', justifyContent : 'end' }} >
                                       <Button sx = {{ p : '4px 23px', backgroundColor : '#000000', fontSize : '14px', color : '#ffffff', borderRadius : '46px'}} onClick = {() => onPostCommentHandler()}>댓글 달기</Button>
                                   </Box>
                               </Card>
                           </Box>
                       </Box>
                   )
               }

           </Box>
}
       </Box>
   
   )
}