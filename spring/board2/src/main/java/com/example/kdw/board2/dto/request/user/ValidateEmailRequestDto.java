package com.example.kdw.board2.dto.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ValidateEmailRequestDto {
    
    @Email
    @NotBlank
    private String email;
}
