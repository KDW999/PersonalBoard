package com.example.kdw.board2.service.implementation;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.common.constant.ResponseMessage;
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
import com.example.kdw.board2.entity.UserEntity;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.UserService;

@Service
public class UserServiceImplements implements UserService{
    
    @Autowired private UserRepository userRepository;

    //? 유저 조회
    public ResponseDto<GetUserResponseDto> getUser(String email) {

        GetUserResponseDto data = null;

        try {
            
            UserEntity userEntity = userRepository.findByEmail(email);

            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
        
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 유저 프로필 수정
    public ResponseDto<PatchProfileResponseDto> patchProfile(String email, PatchProfileRequestDto dto) {

        PatchProfileResponseDto data = null;
        String profile = dto.getProfile(); //? 작업 실행 시 내가 request로 적은 값이 들어간다

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);

            userEntity.setProfile(profile);
            userRepository.save(userEntity);

            data = new PatchProfileResponseDto(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 이메일 중복 검증
    public ResponseDto<ValidateEmailResponseDto> validateEmail(ValidateEmailRequestDto dto) {

        ValidateEmailResponseDto data = null;
        String email = dto.getEmail();

        try {

            boolean hasEmail = userRepository.existsByEmail(email);
            data = new ValidateEmailResponseDto(hasEmail);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);

    }

    //? 닉네임 중복 검증
    public ResponseDto<validateNicknameResponseDto> validateNickname(ValidateNicknameRequestDto dto) {

        validateNicknameResponseDto data = null;
        String nickname = dto.getNickname();

        try {

            boolean hasNickname = userRepository.existsByNickname(nickname);
            data = new validateNicknameResponseDto(hasNickname);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);

    }

    //? 전화번호 중복 검증
    public ResponseDto<ValidateTelNumberResponseDto> validateTelNumber(ValidateTelNumberRequestDto dto) {

        ValidateTelNumberResponseDto data = null;
        String telNumber = dto.getTelNumber();

        try {

            boolean hasTelNumber = userRepository.existsByNickname(telNumber);
            data = new ValidateTelNumberResponseDto(hasTelNumber);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    
}
