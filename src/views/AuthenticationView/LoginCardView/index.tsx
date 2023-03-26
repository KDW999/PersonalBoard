import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {useState, Dispatch, SetStateAction} from 'react'
import { useNavigate } from 'react-router-dom';
import { USER } from 'src/mock';
import { useUserStore } from 'src/stores';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { Button } from '@mui/material';

interface Props{
  setLoginView : Dispatch<SetStateAction<boolean>>
}

export default function LoginCardView({setLoginView} : Props) {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser } = useUserStore();

  const navigator = useNavigate();

  const onLoginHandler = () => {
    //? email / password 입력했는지 검사
    if(!email.trim() || !password){
      alert("모든 칸을 입력해주세요");
      return;
    }

    //? USER mock 데이터의 email, password가 입력받은 email, password와 일치하는 지 검증
    if(USER.email !== email || USER.password !== password){
      alert("로그인 정보가 일치하지 않습니다.");
      return;
    } 

    //? 로그인 처리
    //? 쿠키에 로그인 데이터 (Token) 보관
    //? 스토어 유저 데이터 보관
    setUser(USER);
    navigator('/');
  }

  return (
    <Box display = 'flex' sx = {{height : '100%', flexDirection : 'column', justifyContent : 'space-between'}}>
      <Box>
        <Typography variant = 'h4' fontWeight= '900'>로그인</Typography>
        <TextField sx = {{ mt : '40px'}} fullWidth label = "이메일 주소" variant = "standard" onChange={(event)=> setEmail(event.target.value)}/>
        <FormControl fullWidth variant = "standard" sx = {{ mt : '40px'}}>
          <InputLabel>비밀번호</InputLabel>
          <Input type = {showPassword ? 'text' : 'password'}
          endAdornment = { <InputAdornment position='end'>
            <IconButton onClick= {() => setShowPassword(!showPassword)}>
             {showPassword ? <VisibilityOff/> : <Visibility/>}  
            </IconButton>   
          </InputAdornment>}
          onChange = { (event) => setPassword(event.target.value)}/>
        </FormControl>
      </Box>

      <Box>
        <Button sx = {{ mb : '20px'}} fullWidth variant = "contained" size = "large" onClick = {onLoginHandler}>로그인</Button>
        <Typography textAlign={'center'}> 신규 이용자신가요?
         <Typography component= 'span' fontWeight = {900} onClick = {() => setLoginView(false)}> 회원가입</Typography>
         {/* 클릭하면 부모에 있는 <LoginCardView setLoginView = {setLoginView}/> 가 false로 변경 */}
        </Typography>
      </Box>
    </Box>
  )
}
 