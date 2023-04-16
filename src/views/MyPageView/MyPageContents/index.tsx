import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Box, Grid, Pagination, Typography, Card, CardActionArea, Stack } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';

import axios, { AxiosResponse } from 'axios';
import BoardListItem from 'src/components/BoardListItem';
import useUserStore from 'src/stores/user.store';
import { usePagingHook } from 'src/hooks';
import { BOARD_LIST } from 'src/mock';

import ResponseDto from 'src/apis/response';
import { getPageCount } from 'src/utils';
import { IPreviewItem } from 'src/interfaces';
import { GetMyListResponseDto } from 'src/apis/response/board';
import { authorizationHeader, GET_MY_LIST_URL } from 'src/constants/api';

export default function MyPageContents() {

  //          HooK          //
  
  const { boardList, viewList, pageNumber, onPageHandler, COUNT, setBoardList } = usePagingHook(5);
  //? 로그인 한 상태일 때 유저 정보를 가져올 수 있도록
  //? 스토어에서 user 상태를 가져옴
  const navigator = useNavigate();

  const [cookies] = useCookies();
  const { user } = useUserStore()


  //          Event Handler          //
  const getMyList = (accessToken: string) => {
    axios.get(GET_MY_LIST_URL, authorizationHeader(accessToken))
      .then((response) => getMyListResponseHandler(response))
      .catch((error) => getMyListErrorHandler(error))
  }

  //          Response Handler          //
  const getMyListResponseHandler = (response: AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<GetMyListResponseDto[]>

    if (!result || data === null) return;
    setBoardList(data);

  }

  //          Error Handler          //
  const getMyListErrorHandler = (error: any) => {
    console.log(error.message);

  }

  //          Use Effect          //
  useEffect(() => {

    const accessToken = cookies.accessToken;

    //? 로그인이 되어있지 않으면 로그인 페이지로 이동
    if (!accessToken) {
      alert('로그인이 필요한 작업입니다.');
      navigator('/auth');
      return
    }

    //? BOARD_LIST (전체 게시물 리스트)에서 작성자의 nickname이
    //? 로그인한 회원의 nickname과 일치하는 게시물만 필터링해서
    //? 기준이 되는 새로운 리스트를 생성
    //? const tmp = BOARD_LIST.filter((board) => board.writerNickname === user?.nickname)
    //? 기준이 되는 새로운 리스트를 boardList 상태에 저장
    //?  setBoardList(tmp);

    getMyList(accessToken)

  }, [])
  return (
    <Box sx={{ p: '40px 120px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <Box>
        <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>내 게시물 {boardList.length}</Typography>
      </Box>

      <Box sx={{ mt: '20px', mb: '80px' }}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <Stack spacing={2}>
              {viewList.map((boardItem) => (<BoardListItem item={boardItem as GetMyListResponseDto} />))}
            </Stack>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card variant='outlined' >
              <CardActionArea
                sx={{ p: '25px 0px', display: 'flex', justifyContent: 'center' }}
                onClick={() => navigator('/board/write')}>
                <CreateIcon sx={{ mr: '6px' }} />
                <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>글쓰기</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination page={pageNumber} count={getPageCount(boardList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
      </Box>

    </Box>
  )
}