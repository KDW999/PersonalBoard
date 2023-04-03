package com.example.kdw.board2.service;

import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;

//^ security로 보안 검증 추후에 추가

public interface BoardService {
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardRequestDto dto);
}
