import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import axios, { AxiosResponse } from 'axios';
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import ResponseDto from 'src/apis/response';
import { useUserStore } from 'src/stores';
import { authorizationHeader, FILE_UPLOAD_URL, multipartHeader, PATCH_PROFILE_URL } from 'src/constants/api';
import { PatchProfileRequestDto } from 'src/apis/request/user';
import { PatchProfileResponseDto } from 'src/apis/response/user';

export default function MyPageHead() {

    //          HooK          //
    const imageRef = useRef<HTMLInputElement | null>(null);

    const navigator = useNavigate();
    const [cookies, setCookies] = useCookies();
    const { user, setUser, resetUser } = useUserStore();

    const accessToken = cookies.accessToken;

    //          Event Handler          //
    const onLogoutHandler = () => {
        // TODO : 로그아웃 처리 안됨 해결
        setCookies('accessToken', '', { expires : new Date(), path : '/'});
        resetUser();
        navigator('/');
    }

    // TODO : BoardDetailView, BoardUpdateView, MyPageHead에서 중복
    // TODO : Hook 또는 외부 함수로 변경
    const onProfileUploadChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
         if(!event.target.files) return;
         const data = new FormData();

         data.append('file', event.target.files[0]);

         axios.post(FILE_UPLOAD_URL, data, multipartHeader())
         .then((response) => imageUploadResponseHandler(response))
         .catch((error) => imageUploadErrorHanndler(error));
    }
    
    const onProfileUploadButtonHandler = () => {
        if(!imageRef.current) return;
        imageRef.current.click();
   }

    //          Response Handler          //
    const imageUploadResponseHandler = (response : AxiosResponse<any, any>) => {

        const profile = response.data as string;
        const data : PatchProfileRequestDto = { profile };

        axios.patch(PATCH_PROFILE_URL, data, authorizationHeader(accessToken))
        .then((response) => patchProfileResponseHandler(response))
        .catch((error) => patchProfileErrorHandler(error));

    }

    const patchProfileResponseHandler = (response : AxiosResponse<any, any>) => {

        const {result, message, data} = response.data as ResponseDto<PatchProfileResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        setUser(data);
    }
    //          Error Handler          //
    const imageUploadErrorHanndler = (error : any) =>  console.log(error.message);
    const patchProfileErrorHandler = (error : any) =>  console.log(error.message);

    //          Use Effect          //
    useEffect( () => {

        if(!accessToken){
            navigator('/auth');
            return;
        }

    }, [])
    return (
        <Box sx={{ p: '40px 120px', display: 'flex' }}>

            <Box>
                <IconButton onClick={onLogoutHandler}>
                    <Avatar sx={{ height: '120px', width: '120px' }} alt={user?.nickname} src={user?.profile ? user?.profile : ''} />
                </IconButton>
            </Box>

            <Box sx = {{ ml : '25px', display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
                <Box sx = {{ display : 'flex', alignItems : 'center'}}>
                    <Typography sx = {{ fontSize : '24px', fontWeight : 500, color : 'rgba(0, 0, 0, 0.7)'}}>{user?.nickname}</Typography>
                   
                    <IconButton sx = {{ ml : '10px'}} onClick = {() => onProfileUploadButtonHandler()}>
                        <EditOutlinedIcon />
                        <input ref = {imageRef} hidden type = 'file' accept = 'image/*' onChange={(event) => onProfileUploadChangeHandler(event)}/>
                    </IconButton>
                </Box>

                <Typography sx = {{ mt : '10px', fontSize : '16px', fontWeight : 500, color : 'rgba(0, 0, 0, 0.4)' }}>{user?.email}</Typography>
            </Box>

        </Box>
    )
}