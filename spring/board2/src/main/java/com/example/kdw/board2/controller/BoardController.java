package com.example.kdw.board2.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.service.BoardService;

@RestController
@RequestMapping(ApiPattern.BOARD)
public class BoardController {
    
    @Autowired private BoardService boardService;

    private final String POST_BOARD = "";

    //^ security로 보안 검증 추후에 추가
    
    @PostMapping(POST_BOARD)
    public ResponseDto<PostBoardResponseDto> postBoard(@AuthenticationPrincipal String email, 
    @Valid @RequestBody PostBoardRequestDto requestBody){
        ResponseDto<PostBoardResponseDto> response = boardService.postBoard(email, requestBody);
        return response;
    }
    
}
