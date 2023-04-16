package com.example.kdw.board2.dto.request.user;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ValidateNicknameRequestDto {
    
    @NotBlank
    @Length(max = 15)
    private String nickname;
}
