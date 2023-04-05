package com.example.kdw.board2.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;
import com.example.kdw.board2.service.BoardService;

@RestController
@RequestMapping(ApiPattern.BOARD)
public class BoardController {
    //^ 만들 메서드 
    //? 게시글 작성 O
    //? 댓글 달기 O
    //? 좋아요 누르기
    //? 게시글 조회 
    //? 게시글 수정
    //? 게시글 삭제
    //? 게시글 목록
    //? 내 게시글 목록
    //? 검색어 게시글 리스트
    //? 좋아요 TOP3 게시글
    //? 검색 TOP15 게시글
    //? 연관 검색어 리스트

    @Autowired private BoardService boardService;

    private final String POST_BOARD = "";
    private final String POST_COMMENT = "/comment";
    private final String LIKE = "/like";
    
    //? 게시글 작성
    @PostMapping(POST_BOARD)
    public ResponseDto<PostBoardResponseDto> postBoard(@AuthenticationPrincipal String email, 
    @Valid @RequestBody PostBoardRequestDto requestBody){
        ResponseDto<PostBoardResponseDto> response = boardService.postBoard(email, requestBody);
        return response;
    }

    //? 댓글 달기
    @PostMapping(POST_COMMENT)
    public ResponseDto<PostCommentResponseDto> postComment(@AuthenticationPrincipal String email,
    @Valid @RequestBody PostCommentRequestDto requestBody){
        ResponseDto<PostCommentResponseDto> response = boardService.postComment(email, requestBody);
        return response;
    }

    //? 좋아요 누르기
    @PostMapping(LIKE)
    public ResponseDto<LikeResponseDto> Like(@AuthenticationPrincipal String email,
    @Valid @RequestBody LikeReqeustDto requestBody){
        ResponseDto<LikeResponseDto> response = boardService.like(email, requestBody);
        return response;
    }
    
}
