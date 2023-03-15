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
    <> //? 최상단 태그는 하나
    <NavigationBar/> //? 나중에 컴포넌트 만들어 줌
    <Routes>
      <Route path = '/' element = {(<Main/>)}/> //? 메인화면
      <Route path = '/auth' element = {(<AuthenticationView/>)}/> {/* 로그인, 회원가입*/}
    </Routes>
    </>
  );
}

export default App;
