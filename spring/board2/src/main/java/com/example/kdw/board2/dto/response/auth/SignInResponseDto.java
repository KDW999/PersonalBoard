package com.example.kdw.board2.dto.response.auth;

import com.example.kdw.board2.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponseDto {
    //? Entity(DB Table)에 있는 값을 가져와 생성자로 값을 넣는 곳?
    //? 로그인 요청에 대한 응답

    private String email;

    private String nickname;

    private String telNumber;

    private String address;

    private String profile;

    private String token;

    private int expiredTime;

    public SignInResponseDto(UserEntity userEntity, String token) {
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.telNumber = userEntity.getTelNumber();
        this.address = userEntity.getAddress();
        this.profile = userEntity.getProfile();
        this.token = token;
        this.expiredTime = 7200000;

    }
}
