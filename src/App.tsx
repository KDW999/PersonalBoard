import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NavigationBar from './views/NavigationBar';
import Main from './views/Main';
import AuthenticationView from './views/AuthenticationView';
import MyPageView from './views/MyPageView';
import BoardWriteView from './views/Board/BoardWriteView';
import BoardDetailView from './views/Board/BoardDetailView';
import BoardUpdateView from './views/Board/BoardUpdateView';
import SearchView from './views/SearchView';
import Board from './views/Board';
import Footer from './views/Footer';
import { useCookies } from 'react-cookie';
import { useUserStore } from './stores';
import axios, { AxiosResponse } from 'axios';
import { GET_USER_URL, authorizationHeader } from './constants/api';
import { access } from 'fs';
import ResponseDto from './apis/response';
import { GetUserResponseDto } from './apis/response/user';

//# Router 통신 설계
//? 1. main path : '/'
//? 2. auth path : '/auth' (로그인 및 회원가입 화면)
//? 3. myPage path : '/myPage'
//? 4. boardSearch path : '/board/search/:content'
//? 5. boardDetail path : '/board/detail/:boardNumber'
//? 6. boardWrite path : '/board/write'
//? 7. boardUpdate path : '/board/update/:boardNumber'

function App() {

  const path = useLocation();
  const { setUser } = useUserStore();
  const [ cookies ] = useCookies();
  //? 쿠키가 남아있으면 로그인 유지시키기

  //          Event Handler          //
  const getUser = (accessToken : string) => {
    axios.get(GET_USER_URL, authorizationHeader(accessToken)) //? header에 토큰 날리기
    .then((response) => getUserResponseHandler(response))
    .catch((error) => getUserErrorHandler(error));
  }

  //          Response Handler          //
  const getUserResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data} = response.data as ResponseDto<any>;

    if(!result || !data){
      return;
    }

    const user = data as GetUserResponseDto;
    setUser(user);
  }

  //          Error Handler          //
  const getUserErrorHandler = (error : any) => {
    console.log(error.message);
  }

  useEffect( () => {
    const accessToken = cookies.accessToken;

    if(accessToken) getUser(accessToken);

  }, [path])

  return (
    <> {/* //? 최상단 태그는 하나 */}
    <NavigationBar/> {/* //? 나중에 컴포넌트 만들어 줌 */}
    <Routes>
      {/* /auth처럼 단일 페이지로 사용되는 url 형태일 때 */}
      <Route path = '/' element = {(<Main/>)}/> {/* //? 메인화면 O*/}
      <Route path = '/auth' element = {(<AuthenticationView/>)}/> {/* //? 로그인, 회원가입 O */}
      <Route path = '/myPage' element = {(<MyPageView/>)}/> {/* //? 마이 페이지 O */}
      <Route path = '/board'>  {/* //? /board/추가적으로 url이 붙는 페이지 형태, 여기에 element 쓰면 자식 컴포넌트 안불러와짐? */}
         <Route path = 'write' element = {(<BoardWriteView/>)}/> {/* //? 글쓰기 O */}
         <Route path = 'search/:content' element = {(<SearchView/>)}/> {/* //? 검색 화면 X */}
         <Route path = 'detail/:boardNumber' element = {(<BoardDetailView/>)}/> {/* //? 글 세부내용 O */}
         <Route path = 'update/:boardNumber' element = {(<BoardUpdateView/>)}/> {/* //? 글 수정 O */}
      </Route>
    </Routes>
    {path.pathname !== '/auth' && (<Footer/>)} { /* 로그인 페이지 외 모든 화면에서 보여줄 컴포넌트*/}
    </>
  );
}

export default App;
