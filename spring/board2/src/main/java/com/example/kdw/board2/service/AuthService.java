package com.example.kdw.board2.service;

import com.example.kdw.board2.dto.request.auth.SignInRequestDto;
import com.example.kdw.board2.dto.request.auth.SignUpRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.auth.SignInResponseDto;
import com.example.kdw.board2.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    public ResponseDto<SignUpResponseDto> signUp(SignUpRequestDto dto);
    public ResponseDto<SignInResponseDto> signIn(SignInRequestDto dto);
}
