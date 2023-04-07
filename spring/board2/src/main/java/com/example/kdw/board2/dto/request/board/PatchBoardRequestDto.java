package com.example.kdw.board2.dto.request.board;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatchBoardRequestDto {
    
    @Min(1)
    private int boardNumber;
    
    @NotBlank
    private String boardTitle;

    @NotBlank
    private String boardContent;

    private String boardImgUrl;
}
