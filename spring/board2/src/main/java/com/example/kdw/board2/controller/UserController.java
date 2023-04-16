package com.example.kdw.board2.controller;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
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
import com.example.kdw.board2.service.UserService;

@RestController
@RequestMapping(ApiPattern.USER)
public class UserController {
    
    @Autowired private UserService userService;

    private final String GET_USER = "/";
    private final String PATCH_PROFILE = "/profile";
    private final String VALIDATE_EMAIL = "/validate/email";
    private final String VALIDATE_NICKNAME = "/validate/nickname";
    private final String VALIDATE_TELNUMBER = "/validate/tel-number";

    @PatchMapping(GET_USER)
    public ResponseDto<PatchProfileResponseDto> patchProfile(String email, 
    @Valid @RequestBody PatchProfileRequestDto requestBody){

        ResponseDto<PatchProfileResponseDto> response = userService.patchProfile(email, requestBody);
        return response;

    }

    @PatchMapping(PATCH_PROFILE)
    public ResponseDto<GetUserResponseDto> getUser(String email){
        ResponseDto<GetUserResponseDto> response = userService.getUser(email);
        return response;
    }

    @PostMapping(VALIDATE_EMAIL)
    public ResponseDto<ValidateEmailResponseDto> validateEmail(@Valid @RequestBody ValidateEmailRequestDto requestBody){
        ResponseDto<ValidateEmailResponseDto> response = userService.validateEmail(requestBody);
        return response;
    }

    @PostMapping(VALIDATE_NICKNAME)
    public ResponseDto<validateNicknameResponseDto> validateNickname(@Valid @RequestBody ValidateNicknameRequestDto requestBody){
        ResponseDto<validateNicknameResponseDto> response = userService.validateNickname(requestBody);
        return response;
    }

    @PostMapping(VALIDATE_TELNUMBER)
    public ResponseDto<ValidateTelNumberResponseDto> validateTelNumber(@Valid @RequestBody ValidateTelNumberRequestDto requestBody){
        ResponseDto<ValidateTelNumberResponseDto> response = userService.validateTelNumber(requestBody);
        return response;
    }


}
