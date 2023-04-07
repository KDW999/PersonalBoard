package com.example.kdw.board2.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.kdw.board2.common.constant.ApiPattern;
import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PatchBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.DeleteBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetListResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PatchBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;
import com.example.kdw.board2.service.BoardService;

@RestController
@RequestMapping(ApiPattern.BOARD)
public class BoardController {
    //^ 만들 메서드 
    //? 게시글 작성 O
    //? 댓글 달기 O
    //? 좋아요 누르기 O
    //? 게시글 조회 O
    //? 게시글 수정 O
    //? 게시글 삭제 O
    //? 전체 게시글 목록 O
    //? 내 게시글 목록
    //? 검색어 게시글 리스트
    //? 좋아요 TOP3 게시글
    //? 검색 TOP15 게시글
    //? 연관 검색어 리스트

    @Autowired private BoardService boardService;

    private final String POST_BOARD = "";
    private final String POST_COMMENT = "/comment";
    private final String LIKE = "/like";
    private final String GET_BOARD = "/{boardNumber}";
    private final String PATCH_BOARD = "";
    private final String DELETE_BOARD = "/{boardNumber}";
    private final String GET_LIST = "/list";
    private final String GET_MY_LIST = "/my-list";
    
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

    //? 게시글 조회
    @GetMapping(GET_BOARD)
    public ResponseDto<GetBoardResponseDto> getBoard(@PathVariable("boardNumber") int boardNumber){
        ResponseDto<GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    //? 게시글 수정
    @PatchMapping(PATCH_BOARD)
    public ResponseDto<PatchBoardResponseDto> patchBoard(@AuthenticationPrincipal String email,
    @Valid @RequestBody PatchBoardRequestDto requestBody){
        ResponseDto<PatchBoardResponseDto> response = boardService.patchBoard(email, requestBody);
        return response;
    }

    //? 게시글 삭제
    @DeleteMapping(DELETE_BOARD)
    public ResponseDto<DeleteBoardResponseDto> deleteBoard(@AuthenticationPrincipal String email,
    @PathVariable("boardNumber") int boardNumber){
        ResponseDto<DeleteBoardResponseDto> response = boardService.deleteBoard(email, boardNumber);
        return response;
    }

    //? 전체 게시글 목록
    @GetMapping(GET_LIST)
    public ResponseDto<List<GetListResponseDto>> getList(){
        ResponseDto<List<GetListResponseDto>> response = boardService.getList();
        return response;

    }

    
}
