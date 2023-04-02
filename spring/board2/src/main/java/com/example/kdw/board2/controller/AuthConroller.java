package com.example.kdw.board2.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.dto.request.auth.SignInRequestDto;
import com.example.kdw.board2.dto.request.auth.SignUpRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.auth.SignInResponseDto;
import com.example.kdw.board2.dto.response.auth.SignUpResponseDto;
import com.example.kdw.board2.service.AuthService;

@RestController
@RequestMapping(ApiPattern.AUTH)
public class AuthConroller {
    
    @Autowired private AuthService authService;

    private final String SIGN_UP = "/sign_up";
    private final String SIGN_IN = "/sign-in";

    @PostMapping(SIGN_UP) //? crud의 c, 로그인과 회원가입에 관한 데이터는 숨겨주기
    public ResponseDto<SignUpResponseDto> signUp(@Valid @RequestBody SignUpRequestDto requestBody){
        ResponseDto<SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping(SIGN_IN)
    public ResponseDto<SignInResponseDto> signIn(@Valid @RequestBody SignInRequestDto requestBody){
        ResponseDto<SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    } 

}
