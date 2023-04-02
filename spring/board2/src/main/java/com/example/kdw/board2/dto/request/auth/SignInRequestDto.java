package com.example.kdw.board2.dto.request.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
public class SignInRequestDto {
    //? 로그인 요청
    //? 로그인 시 필요한 데이터 종류에 따라 길이나 email 같은 형태로 지정해줄 건 따로 지정해주는 곳

    @NotBlank
    @Email
    @Length(max = 40)
    private String email;
    
    @NotBlank
    @Length(min = 8, max = 20)
    private String password;

}