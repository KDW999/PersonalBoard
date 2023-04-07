package com.example.kdw.board2.dto.response.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteBoardResponseDto {
    //? 글 삭제하면 삭제됐는지만 여부만 보여주기

    private boolean resultStatus;
}
