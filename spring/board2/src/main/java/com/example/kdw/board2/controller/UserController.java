package com.example.kdw.board2.controller;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.dto.request.user.PatchProfileRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.user.GetUserResponseDto;
import com.example.kdw.board2.dto.response.user.PatchProfileResponseDto;
import com.example.kdw.board2.service.UserService;

@RestController
@RequestMapping(ApiPattern.USER)
public class UserController {
    
    @Autowired private UserService userService;

    private final String GET_USER = "/";
    private final String PATCH_PROFILE = "/profile";

    @PatchMapping
    public ResponseDto<PatchProfileResponseDto> patchProfile(String email, 
    @Valid @RequestBody PatchProfileRequestDto requestBody){

        ResponseDto<PatchProfileResponseDto> response = userService.patchProfile(email, requestBody);
        return response;

    }

    @GetMapping
    public ResponseDto<GetUserResponseDto> getUser(String email){
        ResponseDto<GetUserResponseDto> response = userService.getUser(email);
        return response;
    }
}
