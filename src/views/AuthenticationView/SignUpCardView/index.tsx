import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Checkbox, FormHelperText, IconButton, InputAdornment, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import React, { useState, Dispatch, SetStateAction, ChangeEvent} from 'react'
import { useSignUpStore } from 'src/stores';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { validateEmailRequestDto, validateNicknameRequestDto, validateTelNumberRequestDto } from 'src/apis/request/user';
import { SIGN_UP_URL, VALIDATE_EMAIL_URL, VALIDATE_NICKNAME_URL, VALIDATE_TEL_NUMBER_URL } from 'src/constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from 'src/apis/response';
import { ValidateEmailResponseDto, ValidateNicknameResponseDto, ValidateTelNumberResponseDto } from 'src/apis/response/user';
import { SignUpRequestDto } from 'src/apis/request/auth';
import { SignUpResponseDto } from 'src/apis/response/auth';

function FirstPage() {
   const { email, password, passwordCheck } = useSignUpStore();
   const { setEmail, setPassword, setPasswordCheck } = useSignUpStore();
   const { emailPatternCheck, emailValidate, passwordPatternCheck, passwordValidate } = useSignUpStore();
   const { setEmailPatternCheck, setEmailValidate, setPasswordPatternCheck, setPasswordValidate } = useSignUpStore();
   const { signUpError } = useSignUpStore();

   const [showPassword, setShowPassword ] = useState<boolean>(false);
   const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

   //? 정규식
   const emailValidator = /^[A-Za-z0-9]([-.]?[A-za-z0-9])*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/
   const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/

   //          Event Handler          //
   const onEmailChangeHandler = (event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = emailValidator.test(value);
    setEmailPatternCheck(isMatched);
    // if(isMatched) setEmailMessage('');
    // else setEmailMessage('이메일 주소 포맷이 맞지 않습니다.');
    setEmail(value);
  }
  
  const onEmailValidateButtonHandler = () => {
    // if(emailMessage) return;
    if(!emailPatternCheck) return;
    const data : validateEmailRequestDto = { email }
    
    axios.post(VALIDATE_EMAIL_URL, data)
    .then((response) => validateEmailResponseHandler(response))
    .catch((error) => validateEmailErrorHandler(error));
  }

  const onPasswordChangeHandler = (event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = passwordValidator.test(value);

    setPasswordPatternCheck(isMatched)
    // if(isMatched) setPasswordMessage('');
    // else setPasswordMessage('영 대소문자 + 숫자 + 특수문자(!?_)를 포함한 8-20자');
    setPassword(value);
  }

  const onPasswordCheckChangeHandler = (event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event?.target.value;
    const isMatched = password === value;
    setPasswordValidate(isMatched)
    // if(isMatched) setPasswordCheckMessage('');
    // else setPasswordCheckMessage('비밀번호가 서로 일치하지 않습니다.');
    setPasswordCheck(value);
  }

  //          Response Handler          //
  const validateEmailResponseHandler = (response : AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<ValidateEmailResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }

    setEmailValidate(data.result);
    //const validateMessage = data.result ? '이미 존재하는 이메일입니다.' : '사용가능한 이메일입니다.';
    // alert(validateMessage);
    //setEmailValidateMessage(validateMessage);
  }

  //          Error Handler          //
  const validateEmailErrorHandler = (error : any) => console.log(error.message);

  return (
    <Box>
      {/*현재 상태 보여주는 용도 */email}  
      <FormControl sx={{ mt: '40px' }} error = {signUpError} fullWidth variant='standard'>
        <InputLabel>이메일 주소*</InputLabel>
        <Input type = "text" endAdornment ={
          <InputAdornment position = "end">
            <IconButton onClick={() => onEmailValidateButtonHandler()}>
             <CheckBoxIcon/>
            </IconButton>
          </InputAdornment>
        }
        // value = {'d'} 하면 input에 d가 고정
        // value = {email} 하면 상태에 email의 값이 남아있다.
        // 보여지고 말고의 차이?
        value = {email} // onChange는 둘이 한 세트라 생각하면 편함 
        onChange={(event) => onEmailChangeHandler(event)} // 현재 입력된 텍스트를 읽어오기
        />

       { 
        emailPatternCheck === null ? (<></>) :
        !emailPatternCheck ? ( <FormHelperText sx = {{ color : 'red'}}>이메일 형식이 맞지 않습니다.</FormHelperText>) 
        : emailValidate === null ? ( <FormHelperText sx = {{ color : 'red'}}>이메일 중복 체크를 해주세요.</FormHelperText>)
        : !emailValidate ? ( <FormHelperText sx = {{ color : 'blue'}}>사용가능한 이메일입니다.</FormHelperText>)
        : (<FormHelperText sx = {{ color : 'blue'}}>사용가능한 이메일입니다.</FormHelperText>) 
       }  
        
        </FormControl>

      <FormControl  sx={{ mt: '40px' }} error = {signUpError} fullWidth variant="standard">
        <InputLabel htmlFor="standard-adornment-password">비밀번호*</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value = {password}
          onChange={(event) => onPasswordChangeHandler(event)}
        />
        {
        passwordPatternCheck === false ? (<FormHelperText sx = {{ color : 'red'}}>{'영 대소문자 + 숫자 + 특수문자(!?_)를 포함한 8-20자'}</FormHelperText>) :
        (<></>)
        }
      </FormControl>

      <FormControl sx={{ mt: '40px' }} error={signUpError} fullWidth variant="standard">
        <InputLabel>비밀번호 확인*</InputLabel>
        <Input
          type={showPasswordCheck ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value = {passwordCheck}
          onChange={(event) => onPasswordCheckChangeHandler(event)}
        />
        {
        passwordValidate === false ? (<FormHelperText sx = {{ color : 'red'}}>{'비밀번호가 서로 일치하지 않습니다.'}</FormHelperText>) :
        (<></>)
        }
      </FormControl>
    </Box>
  );
}

//          Component          //

function SecondPage() {
  //          Hook          //
  const{nickname, telNumber, address, addressDetail} = useSignUpStore();
  const{setNickname, setTelNumber, setAddress, setAddressDetail} = useSignUpStore();
  const { nicknameValidate, telNumberPatternCheck, telNumberValidate} = useSignUpStore();
  const { setNicknameValidate, setTelNumberPatternCheck, setTelNumberValidate } = useSignUpStore();
  const { signUpError } = useSignUpStore();

  // const[validateNickname, setValidateNickname] = useState<boolean | null>(null);
  // const[validateTelNumber, setValidateTelNumber] = useState<boolean | null>(null);
  // const[checkPatternTelNumber, setCheckPatternTelNumber] = useState<boolean | null>(null);
  const[telNumberMessage, setTelNumberMessage] = useState<string>('');
  
  // const telNumberValidator = /^[0-9]{0,13}%/;
  const telNumberValidator = /^[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}$/;

  //          Event Handler          //
  const onTelNumberHandler = (event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    const isMatched = telNumberValidator.test(value);
    setTelNumberPatternCheck(isMatched)
    //setCheckPatternTelNumber(isMatched);
    setTelNumber(value);
  }

  const onNicknameValidateButtonHandler = () => {
    if(!nickname) return;
    const data : validateNicknameRequestDto = { nickname } // requestDto의 변수명과 store의 변수명이 일치해야한다.

    axios.post(VALIDATE_NICKNAME_URL, data)
    .then((response) => validateNicknameResponseHandler(response))
    .catch((error) => validateNicknameErrorHandler(error));
  }

  const onTelNumberValidateButtonHandler = () => {
    // if(telNumberMessage) return;
    if(!telNumberPatternCheck) return;
    const data : validateTelNumberRequestDto = { telNumber };

    axios.post(VALIDATE_TEL_NUMBER_URL, data)
     .then((response) => validateTelNumberResponseHandler(response))
     .catch((error) => validateTelNumberErrorHandler(error));
  }

  //          Response Handler          //
  const validateNicknameResponseHandler = (response : AxiosResponse<any, any>) => {

    const { result, message, data } = response.data as ResponseDto<ValidateNicknameResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }
    setNicknameValidate(data.result);
    // setValidateNickname(data.result);

  }
  const validateTelNumberResponseHandler = (response : AxiosResponse<any, any>) => {
  //? 도대체 왜 안됄까?

    const { result, message, data } = response.data as ResponseDto<ValidateTelNumberResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }
    setTelNumberValidate(data.result);
    // setValidateTelNumber(data.result);
  }

  //          Error Handler          //
  const validateNicknameErrorHandler = (error : any) => console.log(error.message);
  const validateTelNumberErrorHandler = (error : any) => console.log(error.message);

  return (
    <Box>
      <FormControl sx = {{mt : '40px'}} error = {signUpError} fullWidth variant = "standard">
        <InputLabel>닉네임*</InputLabel>
        <Input type = "text" endAdornment ={
          <InputAdornment position = 'end'>
            <IconButton onClick = {() => onNicknameValidateButtonHandler()}>
              <CheckBoxRoundedIcon/>
            </IconButton>
          </InputAdornment>
        }
      value = {nickname} 
      onChange = {(event) => setNickname(event.target.value)} 
      />
      { 
      nicknameValidate === null ? (<></>) :
      nicknameValidate ?
      (<FormHelperText sx = {{ color : 'red'}}>사용 중인 닉네임입니다.</FormHelperText>)
      :
      (<FormHelperText sx = {{ color : 'blue'}}>사용 가능한 닉네임입니다.</FormHelperText>)
      }
      </FormControl>
      

      <FormControl sx = {{mt : '40px'}} error = {signUpError} fullWidth variant = "standard">
        <InputLabel>휴대폰 번호*</InputLabel>
        <Input type = "text" endAdornment = {
          <InputAdornment position = 'end'>
            <IconButton onClick = {() => onTelNumberValidateButtonHandler()}>
              <CheckBoxRoundedIcon/>
            </IconButton>
          </InputAdornment>
        }
        value = {telNumber}
        onChange={(event) => onTelNumberHandler(event)}
        />
        {
        telNumberValidate === null ? (<></>) :
        !telNumberPatternCheck ? (<FormHelperText sx = {{ color : 'red'}}>전화번호 패턴이 일치하지 않습니다.</FormHelperText>) :
        telNumberPatternCheck == null ? (<FormHelperText sx = {{ color : 'red'}}>전화번호 중복체크를 해주세요.</FormHelperText>)
        :
        telNumberValidate ?
        (<FormHelperText sx = {{ color : 'red'}}>사용 중인 전화번호입니다.</FormHelperText>)
        :
        (<FormHelperText sx = {{ color : 'blue'}}>사용 가능한 전화번호입니다</FormHelperText>)
        }
        </FormControl>
     
      {/* <TextField 
      sx = {{mt : '40px'}} 
      error = {signUpError}
      fullWidth label = "휴대폰 번호*" 
      variant= 'standard' 
      value = {telNumber} 
      onChange = {(event) => onTelNumberHandler(event)} helperText = {telNumberMessage}/> */}

      <FormControl sx = {{mt : '40px'}} error = {signUpError} fullWidth variant='standard' >
        <InputLabel>주소*</InputLabel>
        <Input type = 'text' endAdornment = {
          <InputAdornment position='end'>
           <IconButton>
            <KeyboardDoubleArrowRightIcon/>
           </IconButton>
          </InputAdornment>}
          value = {address} 
          onChange = {(event) => setAddress(event.target.value)}
          />
      </FormControl>

      <TextField 
      sx = {{mt : '40px'}} 
      error = {signUpError}
      fullWidth label = "상세 주소*" 
      variant='standard'
      value = {addressDetail} 
      onChange = {(event) => setAddressDetail(event.target.value)}/>
      <Box sx = {{display : 'flex', alignItems : 'center' , mt: '24px'}}>
      <Checkbox color = "default"/>
      <Typography sx = {{ mr : '4px', color : 'red'}}>개인정보동의</Typography>
      <Typography>더보기&gt;</Typography>
      </Box>
    </Box>
  )
}

interface Props {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}
export default function SignUpCardView({ setLoginView }: Props) {

  //          Hook          //
  const { email, password, passwordCheck } = useSignUpStore();
  const { nickname, address, addressDetail, telNumber} = useSignUpStore();
  const {setSignUpError} = useSignUpStore();
  const {emailPatternCheck, passwordPatternCheck, telNumberPatternCheck} = useSignUpStore();
  const {emailValidate, passwordValidate, nicknameValidate, telNumberValidate} = useSignUpStore();

  const [page, setPage] = useState<number>(1);

  // const emailValidator = /^[A-Za-z0-9]([-.]?[A-Za-z0-9])*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/ //? 이렇게 적으면 A~Z, a~z 0~9까지만 문자로 지정해줄 수 있다.
  // const passwordValidator = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/

  //          Event Handler          //
  const onNextButtonHandler = () => {
    //todo : 이메일 / 비밀번호 / 비밀번호 확인 검증
    //? 해당 문자열 변수가 빈값인지 확인
    //? 1. 해당 변수 == '';
    //? 2. 해당 변수 길이 == 0;

    if (!email || !password || !passwordCheck) { // 스크립트에선 !으로 값이 비었는지 검사가능 / 자바에선 이러면 안됨
      setSignUpError(true);
      // alert('모든 값을 입력하세요.');
      return;
    }

    if(!emailPatternCheck || !passwordPatternCheck) return;
    if(!passwordValidate) return;
    // if(!emailValidator.test(email)) return;
    // if(!passwordValidator.test(password)) return; //? 이거 왜 통과가 안되지? → 정규식 쓸 때 문자 구분 잘하자
    
    if (password !== passwordCheck) return;
      // alert('비밀번호가 다릅니다.');
    setSignUpError(false);
    setPage(2);
    //todo : 검증이 실패하면 return
    //todo : 검증이 성공하면 page 변경
    
  };

  const onSignUpHandler = () => {
    if(!email || !password || !passwordCheck){
      // alert('모든 값을 입력하세요.');
      setSignUpError(true);
      setPage(1);
      return;
    }
    if(!nickname || !telNumber || !address || !addressDetail){
      setSignUpError(true);
      // alert('모든 값을 입력하세요.');
      setPage(2);
      return;
    }
    if(!emailPatternCheck || !passwordCheck){
      setPage(1);
      return;
    }
    if(!emailValidate || !passwordValidate){
      setPage(1);
      return;
    }

    if(!telNumberPatternCheck){
      setPage(2);
      return;
    }
    if(!nicknameValidate || !telNumberValidate){
      setPage(2);
      return;
    }
    // if(!emailValidator.test(email)) {
    //   setPage(1);
    //   return;
    // }
    // if(!passwordValidator.test(password)) {
    //   setPage(1);
    //   return;
    // }
    if(password !== passwordCheck){
      // alert('비밀번호가 서로 다릅니다.');
      setPage(1);
      return;
    }

    setSignUpError(false);

    const data : SignUpRequestDto = { email, password, nickname, address : `${address} ${addressDetail}` , telNumber } // passwordCheck,
    
    // console.log('axios 이전☆')

    // js는 비동기 처리 → 작업 중 대기 시간을 기다리지 않고 따로 작동시켜놓고 다음 작업으로 넘어감
    // 통신을 위한 axios, post : backend의 주소 담기, then : 작업 처리, catch : 에러 처리
    //? 1. 비동기 처리 (then 방법)
    axios.post(SIGN_UP_URL, data)
    .then((response) => signUpResponseHandler(response))
    .catch((error) => signUpErrorHandler(error))

    // await : 작업이 끝날 때 까지 기다리기 → 동기 처리
    // 호출되는 함수의 매개변수 앞에 async 붙여서 동기처리 해줘야됨
    // 도중에 에러 터지면 다음 작업 실행하지 않음
    // const response = await axios.post("http://localhost:4040/auth/sign-up", data);

    // console.log('axios 이후★')
  }

  //          Response Handler          //
  const signUpResponseHandler = (response : AxiosResponse<any, any>) => {

    const { result, message } = response.data as ResponseDto<SignUpResponseDto>; 

      if(result) setLoginView(true);
      else alert(message);
  }

  //          Error Handler          //
  const signUpErrorHandler = (error : any) => {
    console.log(error.response.status);
  }

  return (
    <Box display='flex' sx={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between' }} >
      <Box>
        <Box display='flex' justifyContent='space-between' >
          <Typography variant='h4' fontWeight='900'>회원가입</Typography>
          <Typography variant='h4' fontWeight='900'>{page}/2</Typography>
        </Box>
        {page === 1 ? (<FirstPage/>) : (<SecondPage/>)}
      </Box>

      <Box>
        {page === 1 && (<Button fullWidth variant='contained' size='large' sx={{ mb: '20px' }} onClick = {onNextButtonHandler}>다음 단계</Button>)}
        {page === 2 && (<Button fullWidth variant='contained' size='large' sx={{ mb: '20px' }} onClick = {onSignUpHandler}>회원가입</Button>)}
        <Typography textAlign='center'>이미 계정이 있으신가요?
          <Typography component='span' fontWeight='900' onClick={() => setLoginView(true)}>{" "}로그인</Typography>
        </Typography>
      </Box>
    </Box>
  )
}