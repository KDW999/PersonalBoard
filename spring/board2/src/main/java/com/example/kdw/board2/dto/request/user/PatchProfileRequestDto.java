package com.example.kdw.board2.dto.request.user;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.URL;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatchProfileRequestDto {
    //? 프로필 수정 시 요청할 데이터

    @NotBlank
    @URL
    private String profile;
}
