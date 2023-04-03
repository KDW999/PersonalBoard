package com.example.kdw.board2.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.common.constant.ResponseMessage;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.entity.BoardEntity;
import com.example.kdw.board2.entity.UserEntity;
import com.example.kdw.board2.repository.BoardRepository;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.BoardService;

@Service
public class BoardServiceImplements implements BoardService{
    
    @Autowired UserRepository userRepository;
    @Autowired BoardRepository boardRepository;

    //? 게시물 작성
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardRequestDto dto){

        PostBoardResponseDto data = null;

        try {

           UserEntity userEntity = userRepository.findByEmail(email);
           if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
        
           BoardEntity boardEntity = new BoardEntity(userEntity, dto);
           boardRepository.save(boardEntity);

           data = new PostBoardResponseDto(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 좋아요 가져오기
}