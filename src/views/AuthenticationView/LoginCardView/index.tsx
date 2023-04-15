import { USER } from 'src/mock';
import React, {useState, Dispatch, SetStateAction, useRef, KeyboardEvent} from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'src/stores';

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { SignInRequestDto } from 'src/apis/request/auth';
import { SIGN_IN_URL } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import { SignInResponseDto } from 'src/apis/response/auth';
import ResponseDto from 'src/apis/response';
import { getExpires } from 'src/utils';

interface Props{
  setLoginView : Dispatch<SetStateAction<boolean>>
}

export default function LoginCardView({setLoginView} : Props) {

  //          Hook          //
  const navigator = useNavigate();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  
  const { setUser } = useUserStore();

  const [cookies, setCookies] = useCookies();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  //          Event Handler          //
  //? Enter 누르기
  const onEmailKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if(event.key !== 'Enter') return;
    if(!passwordRef.current) return //? current는 현재 요소를 담고 있는 용도?
    (passwordRef as any).current.lastChild.firstChild.focus();
  }
  //? Enter 누르기
  const onPasswordKeyPressHandler = (event : KeyboardEvent<HTMLDivElement>) => {
    if(event.key !== 'Enter') return;
    onLoginHandler(); //? 패스워드를 enter로 누르면 login 검사 실행
  }

  const onLoginHandler = () => {
    //? email / password 입력했는지 검사
    if(!email.trim() || !password){
      alert("모든 칸을 입력해주세요");
      return;
    }

    //? USER mock 데이터의 email, password가 입력받은 email, password와 일치하는 지 검증
    // if(USER.email !== email || USER.password !== password){
    //   alert("로그인 정보가 일치하지 않습니다.");
    //   return;
    // } 

    //? 로그인 처리
    //? 쿠키에 로그인 데이터 (Token) 보관
    //? 스토어 유저 데이터 보관

    // setUser(USER); //? 여기서 user store에 있는 setUser를 호출하였고 인자는 mock 데이터의 USER를 주었음, 
                   //? 이렇게 state를 관리하는 store에 매개변수(여기선 mock에 있는 데이터들)를 주어서 한 번 저장해주면 
                   //? 다른 파일에서 계속 사용 가능..? 
    // navigator('/');

    
    const data : SignInRequestDto = { email, password };

    //^ Axios 사용
    axios.post(SIGN_IN_URL, data) //? 여기서 백엔드 서버에 있는 url과 프론트 화면을 연결해서 데이터 날려주기
    .then((response) => SignInResponseHandler(response))
    .catch((error) => SignInErrorHandler(error));
    
  };

  //          Response Handler          //
  const SignInResponseHandler = (response : AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<SignInResponseDto>;
    //? result : 작업 결과 상태 true, false
    //? message : 작업 결과에 따른 보여줄 message
    //? data : 작업 결과에 따른 보여줄 data, false시엔 없음

    if(!result || !data){ //? 작업 결과 상태나 데이터가 없다면
      setLoginError(true);
      alert('로그인 정보가 잘못되었습니다.');
      return;
    }

    alert('이건 뜨나?')
    const { token, expiredTime, ...user } = data; //? 토큰과 만료 시간 및 나머지 유저 데이터에 로그인 시 data 저장 
    //? 로그인 처리
    //? 쿠키에 로그인 데이터 (Token) 보관 
    const expires = getExpires(expiredTime); //? 만료 시간 검증
    setCookies('accessToken', token, {expires});

    //? 스토어에 유저 데이터 보관
    setUser(user);
    navigator('/');

    alert('로그인 성공');
  }

  //          Error Handler          //
  const SignInErrorHandler = (error : any) => console.log(error.message)

  return (
    <Box display = 'flex' sx = {{height : '100%', flexDirection : 'column', justifyContent : 'space-between'}}>
      <Box>
        <Typography variant = 'h4' fontWeight= '900'>로그인</Typography>
        <TextField error = {loginError} sx = {{ mt : '40px'}} fullWidth label = "이메일 주소" variant = "standard" onChange={(event)=> setEmail(event.target.value)}
        onKeyPress = {(event) => onEmailKeyPressHandler(event)}/>

        <FormControl error = {loginError} ref = {passwordRef} fullWidth variant = "standard" sx = {{ mt : '40px'}}>
          <InputLabel>비밀번호</InputLabel>
          <Input type = {showPassword ? 'text' : 'password'}
          endAdornment = { <InputAdornment position='end'>
            <IconButton onClick= {() => setShowPassword(!showPassword)}>
             {showPassword ? <VisibilityOff/> : <Visibility/>}  
            </IconButton>   
          </InputAdornment>}
          onChange = { (event) => setPassword(event.target.value)}
          onKeyPress = {(event) => onPasswordKeyPressHandler(event)}/>
        </FormControl>
      </Box>

      <Box>
        {
          loginError && (
            <Box sx = {{ mb : '12px'}}>
              <Typography>이메일 주소 또는 비밀번호를 잘못 입력했습니다.</Typography>
              <Typography>입력하신 내용을 다시 확인해 주세요.</Typography>
              </Box>
          )
        }
        <Button sx = {{ mb : '20px'}} fullWidth variant = "contained" size = "large" onClick = {onLoginHandler}>로그인</Button>
        <Typography textAlign={'center'}> 신규 이용자신가요?
         <Typography component= 'span' fontWeight = {900} onClick = {() => setLoginView(false)}> 회원가입</Typography>
         {/* 클릭하면 부모에 있는 <LoginCardView setLoginView = {setLoginView}/> 가 false로 변경 */}
        </Typography>
      </Box>
    </Box>
  )
}
 