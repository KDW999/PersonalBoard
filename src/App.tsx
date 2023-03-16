import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router';

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

  return (
    <> {/* //? 최상단 태그는 하나 */}
    확인용
    <></> {/* //? 나중에 컴포넌트 만들어 줌 */}
    <Routes>
      {/* /auth처럼 단일 페이지로 사용되는 url 형태일 때 */}
      <Route path = '/' element = {<></>}/> {/* //? 메인화면 */}
      <Route path = '/auth' element = {(<></>)}/> {/* //? 로그인, 회원가입*/}
      <Route path = '/myPage' element = {(<></>)}/> {/* //? 마이 페이지 */}
      <Route path = '/board'> {/* //? /board/추가적으로 url이 붙는 페이지 형태 */}
         <Route path = 'write' element = {(<></>)}/> {/* //? 글쓰기 */}
         <Route path = 'search/:content' element = {(<></>)}/> {/* //? 검색 화면 */}
         <Route path = 'detail/:boardNumber' element = {(<></>)}/> {/* //? 글 세부내용 */}
         <Route path = 'update/:boardNumber' element = {(<></>)}/> {/* //? 글 수정 */}
      </Route>
    </Routes>
    {path.pathname !== '/auth' && (<></>)} { /* 로그인 페이지 외 모든 화면에서 보여줄 컴포넌트*/}
    </>
  );
}

export default App;
