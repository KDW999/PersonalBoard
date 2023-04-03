package com.example.kdw.board2.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.common.constant.ResponseMessage;
import com.example.kdw.board2.dto.request.auth.SignInRequestDto;
import com.example.kdw.board2.dto.request.auth.SignUpRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.auth.SignInResponseDto;
import com.example.kdw.board2.dto.response.auth.SignUpResponseDto;
import com.example.kdw.board2.entity.UserEntity;
import com.example.kdw.board2.provider.TokenProvider;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.AuthService;

@Service
public class AuthServiceImplements implements AuthService {
    
    @Autowired private UserRepository userRepository;
    @Autowired private TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseDto<SignUpResponseDto> signUp(SignUpRequestDto dto){

        SignUpResponseDto data = null;

        String email = dto.getEmail();
        String telNumber = dto.getTelNumber();
        String password = dto.getPassword();

        try {

            boolean hasEmail = userRepository.existsByEmail(email);
            if(hasEmail) return ResponseDto.setFailed(ResponseMessage.EXIST_EMAIL);

            boolean hasTelNumber = userRepository.existsByTelNumber(telNumber);
            if(hasTelNumber) return ResponseDto.setFailed(ResponseMessage.EXIST_TEL_NUMBER);

            //? 패스워드 암호화
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            data = new SignUpResponseDto(true);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }


    public ResponseDto<SignInResponseDto> signIn(SignInRequestDto dto) {

        SignInResponseDto data = null;

        String email = dto.getEmail();
        String password = dto.getPassword();

        UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.FAIL_SIGN_IN);

           //? 비밀번호 검증
           boolean isEqualPassword = passwordEncoder.matches(password, userEntity.getPassword());
           if(!isEqualPassword) return ResponseDto.setFailed(ResponseMessage.FAIL_SIGN_IN);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        try {

            String token = tokenProvider.create(email);

            data = new SignInResponseDto(userEntity, token);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.FAIL_SIGN_IN);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }
}
