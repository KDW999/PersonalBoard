package com.example.kdw.board2.dto.request.user;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ValidateTelNumberRequestDto {
    
    @NotBlank
    @Length(min = 11, max = 14)
    private String telNumber;
}
