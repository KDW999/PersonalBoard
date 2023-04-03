package com.example.kdw.board2.dto.request.board;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostBoardRequestDto {
    //? 게시물 작성할 때 게시물 제목, 게시물 내용, 게시물 이미지

    @NotBlank
    private String boardTitle;

    @NotBlank
    private String boardContent;

    private String boardImgUrl;
}
