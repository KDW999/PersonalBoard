package com.example.kdw.board2.service;

import java.util.List;

import org.apache.catalina.connector.Response;

import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PatchBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.DeleteBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetBoardResponseDto;
import com.example.kdw.board2.dto.response.board.GetLikeTop3ListResponseDto;
import com.example.kdw.board2.dto.response.board.GetListResponseDto;
import com.example.kdw.board2.dto.response.board.GetMyListResponseDto;
import com.example.kdw.board2.dto.response.board.GetSearchListResponseDto;
import com.example.kdw.board2.dto.response.board.GetTop15RelatedSearchWordResponseDto;
import com.example.kdw.board2.dto.response.board.GetTop15SearchWordResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PatchBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;


public interface BoardService {
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardRequestDto dto);
    public ResponseDto<PostCommentResponseDto> postComment(String email, PostCommentRequestDto dto);
    public ResponseDto<LikeResponseDto> like(String email, LikeReqeustDto dto);
    public ResponseDto<GetBoardResponseDto> getBoard(int boardNumber);
    public ResponseDto<PatchBoardResponseDto> patchBoard(String email, PatchBoardRequestDto dto);
    public ResponseDto<DeleteBoardResponseDto> deleteBoard(String email, int boardNumber);
    public ResponseDto<List<GetListResponseDto>> getList();
    public ResponseDto<List<GetMyListResponseDto>> getMyList(String email);
    public ResponseDto<List<GetSearchListResponseDto>> getSearchList(String searchWord, String previousSearchWord);
    public ResponseDto<List<GetLikeTop3ListResponseDto>> getLikeTop3List();
    public ResponseDto<GetTop15SearchWordResponseDto> getTop15SearchWord();
    public ResponseDto<GetTop15RelatedSearchWordResponseDto> getTop15RelatedSearchWord(String searchWord);
}
