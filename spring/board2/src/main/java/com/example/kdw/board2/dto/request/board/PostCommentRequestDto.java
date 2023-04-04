package com.example.kdw.board2.dto.request.board;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCommentRequestDto {
    //? 댓글 쓸 때 보내는 데이터는 게시판 번호, 댓글 내용
    
    @Min(1)
    private int boardNumber;

    @NotBlank
    private String commentContent;
}
