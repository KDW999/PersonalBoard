package com.example.kdw.board2.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.dto.request.user.PatchProfileRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.user.GetUserResponseDto;
import com.example.kdw.board2.dto.response.user.PatchProfileResponseDto;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.UserService;

@Service
public class UserServiceImplements implements UserService{
    
    @Autowired private UserRepository userRepository;

    @Override
    public ResponseDto<PatchProfileResponseDto> patchProfile(String email, PatchProfileRequestDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'patchProfile'");
    }

    @Override
    public ResponseDto<GetUserResponseDto> getUser(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUser'");
    }

    
}
