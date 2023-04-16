package com.example.kdw.board2.service;

import com.example.kdw.board2.dto.request.user.PatchProfileRequestDto;
import com.example.kdw.board2.dto.request.user.ValidateEmailRequestDto;
import com.example.kdw.board2.dto.request.user.ValidateNicknameRequestDto;
import com.example.kdw.board2.dto.request.user.ValidateTelNumberRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.user.GetUserResponseDto;
import com.example.kdw.board2.dto.response.user.PatchProfileResponseDto;
import com.example.kdw.board2.dto.response.user.ValidateEmailResponseDto;
import com.example.kdw.board2.dto.response.user.ValidateTelNumberResponseDto;
import com.example.kdw.board2.dto.response.user.validateNicknameResponseDto;

public interface UserService {
    
    public ResponseDto<PatchProfileResponseDto> patchProfile(String email, PatchProfileRequestDto dto);
    public ResponseDto<GetUserResponseDto> getUser(String email); //? 유저의 정보를 조회할 때 필요한 건 이메일뿐?
    public ResponseDto<ValidateEmailResponseDto> validateEmail(ValidateEmailRequestDto dto);
    public ResponseDto<validateNicknameResponseDto> validateNickname(ValidateNicknameRequestDto dto);
    public ResponseDto<ValidateTelNumberResponseDto> validateTelNumber(ValidateTelNumberRequestDto dto);
    
}
