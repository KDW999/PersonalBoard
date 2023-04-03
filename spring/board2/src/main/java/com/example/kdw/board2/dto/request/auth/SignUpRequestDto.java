package com.example.kdw.board2.dto.request.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpRequestDto {
    
    //? 회원가입 시엔 이메일, 패스워드, 닉네임, 전화번호, 주소

    @NotBlank
    @Email
    @Length(max = 40)
    private String email;

    @NotBlank
    @Length(min = 4, max = 20)
    private String password;

    @NotBlank
    @Length(min = 3, max = 10)
    private String nickname;

    @NotBlank
    @Length(min = 11, max = 13)
    private String telNumber;

    @NotBlank
    private String address;
}
