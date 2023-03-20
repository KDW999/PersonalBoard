import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import PopularCard from 'src/components/PopularCard'


export default function MainContents() {

//   const { viewList, boardList, COUNT, pageNumber, onPageHandler, setBoardList} = usePagingHook(5);

  return (
    <Box sx = {{ p : '40px 120px', backgroundColor : 'rgba(300, 100, 50, 0.5)'}}>
        <Box>
           <Typography sx = {{ fontSize : '24px', fontWeight : '400'}}> 최신 게시물 </Typography>
        </Box>
        
        <Box sx = {{ pt : '20px', pb : '80px'}}>
          <Grid container spacing = {3}>
            <Grid item sm = {12} md = {8}>
              <Stack spacing = {2}>
                {/*viewList.map */ }나중에 추가
              </Stack>    
            </Grid>
            <Grid item sm = {12} md = {4}>
                <PopularCard title = "인기 검색어" />
            </Grid>
          </Grid>
        </Box>

        <Box sx = {{ display : 'flex', justifyContent : 'center'}}>
           나중에 추가
        </Box>


    </Box>
  )
}
