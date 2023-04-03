package com.example.kdw.board2.dto.response.user;

import com.example.kdw.board2.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatchProfileResponseDto {
    //? 프로필 수정 시 반환?해줄 데이터들

    private String email;

    private String nickname;

    private String telNumber;

    private String address;

    private String profile;

    //? 유저의 프로필을 수정하기 위해 유저 엔터티의 데이터 사용
    public PatchProfileResponseDto(UserEntity userEntity){
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.telNumber = userEntity.getTelNumber();
        this.address = userEntity.getAddress();
        this.profile = userEntity.getProfile();
    }
}
