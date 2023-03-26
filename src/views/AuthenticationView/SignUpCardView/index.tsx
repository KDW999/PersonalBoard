import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState, Dispatch, SetStateAction} from 'react'
import { useSignUpStore } from 'src/stores';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

function FirstPage() {
   const { email, password, passwordCheck } = useSignUpStore();
   const { setEmail, setPassword, setPasswordCheck } = useSignUpStore();
   const [showPassword, setShowPassword ] = useState<boolean>(false);
   const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

   return(
      <Box>
         { email}
         <TextField
         sx = {{ mt : '40px'}}
         fullWidth label = "이메일 주소*"
         variant = "standard"
         
         //? value = { 'v' }하면 input에 d가 고정
         //? value = { email }하면 상태에 email의 값이 남아있다.
         //? 보여주고 말고의 차이
         value = {email} // onChange는 둘이 한 세트라 생각하면 편함
         onChange = {(event) => setEmail(event.target.value)} // 현재 입력된 텍스트를 읽어오기
         />

         <FormControl fullWidth variant = 'standard' sx = {{ mt : '40px'}}>
            <InputLabel htmlFor = 'standard-adornment-password'>비밀번호</InputLabel>
            <Input type = {showPassword ? 'text' :  'password'} endAdornment = { <InputAdornment position = 'end'>
                <IconButton onClick = { () => setShowPasswordCheck(!showPassword)}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
               </InputAdornment>}
               value = {password} 
               onChange = {(event) => setPassword(event.target.value)}/>
         </FormControl>

         <FormControl fullWidth variant = "standard" sx = {{ mt : '40px'}}>
            <InputLabel htmlFor = 'standard-adornment-password'>비밀번호 확인</InputLabel>
            <Input type = {showPasswordCheck ? 'text' : 'password'}
            endAdornment = {
                <InputAdornment position = 'end'>
                 <IconButton onClick = { () => setShowPasswordCheck(!showPasswordCheck)}>
                    {showPasswordCheck ? <VisibilityOff/> : <Visibility/>}
                 </IconButton>
                </InputAdornment>
            }
            value = {passwordCheck}
            onChange = {(event) => setPasswordCheck(event.target.value)}
            />
         </FormControl>
      </Box>
   )
} // First

function SecondPage(){
    const {nickname, telNumber, address, addressDetail} = useSignUpStore();
    const {setNickname, setTelNumber, setAddress, setAddressDetail} = useSignUpStore();

    return (
        <Box>
            <TextField sx = {{ mt : '40px'}} fullWidth label = '닉네임' variant = 'standard' value = {nickname}
            onChange = {(event) => setNickname(event.target.value)}/>
            <TextField sx = {{ mt : '40px'}} fullWidth label = "휴대폰 번호" variant = 'standard' value = {telNumber}
            onChange = {(event) => setTelNumber(event.target.value)}/>

            <FormControl fullWidth variant = 'standard' sx = {{ mt : '40px'}}>
                <InputLabel>주소*</InputLabel>
                <Input type = 'text' endAdornment = {
                    <InputAdornment position = 'end'>
                        <IconButton>
                            <KeyboardDoubleArrowRightIcon/>
                        </IconButton>
                    </InputAdornment>}
                    value = {address}
                    onChange = {(event) => setAddress(event.target.value)}/>
            </FormControl>

            <TextField sx = {{ mt : '40px'}} fullWidth label = '상세 주소' variant = 'standard'
            value = {addressDetail} onChange = {(event) => setAddressDetail(event.target.value)}/>
        </Box>
    )
} // Second
interface Props {
   setLoginView : Dispatch<SetStateAction<boolean>>;
}

export default function SignUpCardView({setLoginView} : Props) {

    const { email, password, passwordCheck } = useSignUpStore();
    const [page, setPage ] = useState<number>(1);
    const { nickname, address, addressDetail, telNumber} = useSignUpStore();

    const onNextButtonHandler = () => {
    //^ Todo : 이메일 / 비밀번호 / 비밀번호 확인 검증
    //? 해당 문자열 변수가 빈값인지 확인
    //? 1. 해당 변수 == '';
    //? 2. 해당 변수 길이 == 0;
    if(!email || !password || !passwordCheck){  // 스크립트에선 !으로 값이 비었는지 확인 가능 / 자바는 불가
       alert('모든 값을 입력하세요.');
       return;
    }
    if(password !== passwordCheck){
        alert('비밀번호가 다릅니다.');
        return
    }

    //^ Todo : 검증이 실패하면 return
    //^ Todo : 검증이 실패하면 page 변경
    setPage(2);
    };

    const onSignUpHandler = () => {
        if(!email || !password || !passwordCheck){
            alert('모든 값을 입력하세요');
            setPage(1);
            return;
        }
        if(!nickname || !telNumber || !address || !addressDetail){
            alert('비밀번호가 서로 다릅니다.');
            setPage(1);
            return;
        }

        alert('회원가입이 되었습니다.');

        const data = { email, password, nickname, address, addressDetail, telNumber}

        console.log(data);
    }

  return (
    <Box display = 'flex' sx = {{ height : '100%', flexDirection : 'column', justifyContent : 'space-between'}}>
        <Box>
            <Box display = 'flex' justifyContent= 'space-between'>
                <Typography variant = 'h4' fontWeight= '900'>회원가입</Typography>
                <Typography variant = 'h4' fontWeight= '900'>{page}/2</Typography>
            </Box>
            {page === 1 ? (<FirstPage/>) : (<SecondPage/>)}
        </Box>

        <Box>
            {page === 1 && (<Button fullWidth variant = 'contained' size = 'large' sx = {{ mb : '20px'}} onClick = {onNextButtonHandler}>다음 단계</Button>)}
            {page === 2 && (<Button fullWidth variant = 'contained' size = 'large' sx = {{ mb : '20px'}} onClick = {onSignUpHandler}>회원가입</Button>)}
            <Typography textAlign= 'center'>이미 계정이 있으신가요?
              <Typography component= 'span' fontWeight = '900' onClick = {() => setLoginView(true)}> 로그인</Typography>
            </Typography>
        </Box>
    </Box>
  )
}
