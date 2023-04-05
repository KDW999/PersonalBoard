package com.example.kdw.board2.service;

import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;


public interface BoardService {
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardRequestDto dto);
    public ResponseDto<PostCommentResponseDto> postComment(String email, PostCommentRequestDto dto);
    public ResponseDto<LikeResponseDto> like(String email, LikeReqeustDto dto);
}
