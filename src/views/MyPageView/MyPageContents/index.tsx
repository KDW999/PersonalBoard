import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import BoardListItem from 'src/components/BoardListItem';
import { usePagingHook } from 'src/hooks'
import { IPreviewItem } from 'src/interfaces';
import { BOARD_LIST } from 'src/mock';
import { useUserStore } from 'src/stores';
import CreateIcon from '@mui/icons-material/Create'
import Pagination from '@mui/material/Pagination';
import { getPageCount } from 'src/utils';

export default function MyPageContents() {

   const { boardList, viewList, pageNumber, onPageHandler, COUNT, setBoardList } = usePagingHook(5);

   const { user } = useUserStore();
   const navigator = useNavigate();

   useEffect( () => {

    //? 마이 페이지에서 로그인 되어있지 않을 시 로그인 페이지로 이동
    //? 새로고침 할 때 마다 로그인 풀림;;
    if(!user){
        alert('로그인이 필요합니다.');
        navigator('/auth');
        return;
    } 

    //? BOARD_LIST (전체 게시물 리스트)에서 작성자의 nickname이 
    //? 로그인한 회원의 nickname과 일치하는 게시물만 필터링
    const tmp = BOARD_LIST.filter((board) => board.writerNickname === user?.nickname)
    
    //? tmp에는 BOARD_LIST에 있는 조건에 부합하는 writerNickname이 순차적으로 담긴다. 
    setBoardList(tmp);
    
   }, [])

  return (
    <Box sx = {{ p : '40px 120px', backgroundColor : 'rgba(152, 120, 100, 0.5)'}}>
        <Box>
            <Typography sx = {{ fontSize : '24px', fontWeight : 500}}>나의 게시물 {boardList.length}</Typography>
        </Box>

    <Box sx = {{ mt : '20px', mb : '80px'}}>
        <Grid container spacing = {3}>
            <Grid item sm = {12} md = {8}>
                <Stack spacing = {2}>
                   {viewList.map((boardItem) => (<BoardListItem item = {boardItem as IPreviewItem}/>))}
                </Stack>
            </Grid>
         <Grid item sm = {12} md = {4}>
            <Card variant = 'outlined'>
                <CardActionArea sx = {{ p: '25px 0px', display : 'flex', justifyContent : 'center'}}
                onClick = {() => navigator('/board/write')}>
                    <CreateIcon sx = {{ mr : '6px'}}/>
                    <Typography sx = {{ fontSize : '18px', fontWeight : 500}}>글쓰기</Typography>
                </CardActionArea>
            </Card>
          </Grid>
        </Grid>
    </Box>
     <Box sx = {{ display : 'flex', justifyContent : 'center'}}>
        <Pagination page = {pageNumber} count = {getPageCount(boardList, COUNT)} onChange = {(event, value) => onPageHandler(value)}/>
     </Box>

    </Box>
  )
}
