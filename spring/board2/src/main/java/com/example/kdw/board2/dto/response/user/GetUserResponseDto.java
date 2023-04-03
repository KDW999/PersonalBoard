package com.example.kdw.board2.dto.response.user;

import com.example.kdw.board2.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserResponseDto {
    //? 유저 정보 조회시 보여줄 데이터들

    private String email;

    private String nickname;

    private String telNumber;

    private String address;

    private String profile;

    public GetUserResponseDto(UserEntity userEntity){
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.telNumber = userEntity.getTelNumber();
        this.address = userEntity.getAddress();
        this.profile = userEntity.getProfile();
    }
}
