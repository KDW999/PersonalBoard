import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import BoardListItem from 'src/components/BoardListItem'
import PopularCard from 'src/components/PopularCard'
import { usePagingHook } from 'src/hooks'
import { BOARD_LIST } from 'src/mock'
import { getPageCount } from 'src/utils'


export default function MainContents() {

   const { viewList, boardList, COUNT, pageNumber, onPageHandler, setBoardList} = usePagingHook(5);

   useEffect(() => {
      setBoardList(BOARD_LIST)
   }, [])

  return (
    <Box sx = {{ p : '40px 120px', backgroundColor : 'rgba(300, 100, 50, 0.5)'}}>
        <Box>
           <Typography sx = {{ fontSize : '24px', fontWeight : '400'}}> 최근 작성글 </Typography>
        </Box>
        
        <Box sx = {{ pt : '20px', pb : '80px'}}>
          <Grid container spacing = {3}>
            <Grid item sm = {12} md = {8}>
              <Stack spacing = {2}>
                {/* {viewList.map((boardItem) => (<BoardListItem item = {boardItem as IPreviewItem}/>))} */}
              </Stack>    
            </Grid>
            <Grid item sm = {12} md = {4}>
                <PopularCard title = "인기 검색어" />
            </Grid>
          </Grid>
        </Box>

        <Box sx = {{ display : 'flex', justifyContent : 'center'}}>
           <Pagination page = {pageNumber} count = {getPageCount(boardList, COUNT)} onChange = {(event, value) => onPageHandler(value)}/>
        </Box>


    </Box>
  )
}
