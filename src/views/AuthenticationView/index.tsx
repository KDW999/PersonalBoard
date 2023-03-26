//? Box Component : mui에서 공간을 할당하는 모든 태그 
//? Grid Component :  mui에서 공간을 12등분하여 가로 사이즈에 따라 반응형 웹 개발 지원
//? Typography Componenet : mui에서 글자를 출력하는 모든 태그 포함
import { Card, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import LoginCardView from './LoginCardView';
import SignUpCardView from './SignUpCardView';

//# Component return 안에서 조건문처럼 논리 연산자와 삼항 연산자를 조건문처럼 사용
//? 논리 연산자 && : if문
//? 삼항 연산자 (조건 ? 참 : 거짓) : if else

export default function AuthenticationView() {
  
  const [loginView, setLoginView] = useState<boolean>(true); // 상태 변화의 기준은 잘 생각하기
  
  return (
    <Box sx= {{ pr : '120px', pl : "120px"}}>
      <Grid container spacing = {2}>
        <Grid item lg = {7} sm = {12}>
          <Box sx = {{ display : 'flex', height : '100%', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
            <Typography variant = 'h4'> Welcome </Typography>
            <Typography variant = 'h4'> KDW 게시판입니다.</Typography>
          </Box>
        </Grid>
       <Grid item lg = {5} sm = {12}>
        <Card sx = {{ height : '630px', mt : '100px', marginBottom : '80px',
        pt : '50px', pb : '30px', pl : '50px', pr : '50px'
        }}>
          { loginView ? (<LoginCardView setLoginView = {setLoginView}/>) : (<SignUpCardView setLoginView = {setLoginView}/>)}
        </Card>
       </Grid>
      </Grid>
    </Box>
  )
}
