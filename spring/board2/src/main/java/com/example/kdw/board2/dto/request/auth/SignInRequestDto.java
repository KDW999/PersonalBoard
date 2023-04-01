package com.example.kdw.board2.dto.request.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
public class SignInRequestDto {
    
    //? 로그인 시 필요한 건 이메일과 패스워드!

    @NotBlank
    @Email
    @Length(max = 40)
    private String email;
    
    @NotBlank
    @Length(min = 8, max = 20)
    private String password;

}