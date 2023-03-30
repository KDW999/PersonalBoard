import { Grid, Pagination, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BoardListItem from 'src/components/BoardListItem';
import PopularCard from 'src/components/PopularCard';
import { usePagingHook } from 'src/hooks';
import { IPreviewItem } from 'src/interfaces';
import { BOARD_LIST } from 'src/mock';
import { getPageCount } from 'src/utils';

export default function SearchView() {

  const { content } = useParams();
  const { viewList, boardList, COUNT, pageNumber, onPageHandler, setBoardList } = usePagingHook(5);

  useEffect( ()=> {

    const tmp = BOARD_LIST.filter((board)=> board.boardTitle.includes(content as string));
    setBoardList(tmp);
  }, [content])

  return (
    <Box sx = {{ p : '40px 120px', backgroundColor : 'rgba(0, 0, 0, 0.22)'}}>
      <Box sx = {{ fontSize : '24px', fontWeight : 500}}>
        <Box component = 'strong'>{content}</Box>
          <Typography>에 대한 검색 결과</Typography>
        <Box component = 'strong'>{boardList.length}</Box>
      </Box>

      <Box sx = {{ pt : '20px', pb : '80px'}}>
        <Grid container spacing = {3}>
          <Grid item sm = {12} md = {8}>
            <Stack spacing = {2}>
              {viewList.length === 0 ?
              (<Box sx = {{ height : '416px', display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                <Typography>검색 결과가 없습니다.</Typography>
              </Box>)
              : 
              (viewList.map((boardItem) => (<BoardListItem item = {boardItem as IPreviewItem}/>)))}
            </Stack>
          </Grid>
          <Grid item sm = {12} md = {4}>
            <PopularCard title='연관 검색어'/>
          </Grid>
        </Grid>
      </Box>

      <Box sx = {{ display : 'flex', justifyContent : 'center'}}>
         <Pagination page = {pageNumber} count = {getPageCount(boardList, COUNT)} onChange = {(event, value) => onPageHandler(value)}/>
      </Box>
    </Box>
  )
}
