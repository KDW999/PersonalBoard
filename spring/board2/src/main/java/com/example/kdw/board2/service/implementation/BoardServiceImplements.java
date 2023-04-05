package com.example.kdw.board2.service.implementation;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.kdw.board2.common.constant.ResponseMessage;
import com.example.kdw.board2.dto.request.board.LikeReqeustDto;
import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;
import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;
import com.example.kdw.board2.dto.response.ResponseDto;
import com.example.kdw.board2.dto.response.board.LikeResponseDto;
import com.example.kdw.board2.dto.response.board.PostBoardResponseDto;
import com.example.kdw.board2.dto.response.board.PostCommentResponseDto;
import com.example.kdw.board2.entity.BoardEntity;
import com.example.kdw.board2.entity.CommentEntity;
import com.example.kdw.board2.entity.LikyEntity;
import com.example.kdw.board2.entity.UserEntity;
import com.example.kdw.board2.repository.BoardRepository;
import com.example.kdw.board2.repository.CommentRepository;
import com.example.kdw.board2.repository.LikyRepository;
import com.example.kdw.board2.repository.UserRepository;
import com.example.kdw.board2.service.BoardService;

@Service
public class BoardServiceImplements implements BoardService{
    
    @Autowired UserRepository userRepository;
    @Autowired BoardRepository boardRepository;
    @Autowired CommentRepository commentRepository;
    @Autowired LikyRepository likyRepository;

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

    //? 댓글 작성
    public ResponseDto<PostCommentResponseDto> postComment(String email, PostCommentRequestDto dto){

        PostCommentResponseDto data = null;

        int boardNumber = dto.getBoardNumber();

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            CommentEntity commentEntity = new CommentEntity(userEntity, dto);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

            List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(boardNumber);
            List<LikyEntity> likyList = likyRepository.findByBoardNumber(boardNumber);

            data = new PostCommentResponseDto(boardEntity, likyList, commentList);

            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    //? 좋아요 누르기
    public ResponseDto<LikeResponseDto> like(String email, LikeReqeustDto dto){

        LikeResponseDto data = null;
        int boardNumber = dto.getBoardNumber();

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            System.out.println(userEntity);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_BOARD);

            LikyEntity likyEntity = likyRepository.findByUserEmailAndBoardNumber(email, boardNumber);
            if(likyEntity == null){
                likyEntity = new LikyEntity(userEntity, boardNumber);
                likyRepository.save(likyEntity);
                boardEntity.increaseLikeCount();
            }
            else{
                likyRepository.delete(likyEntity);
            }

            boardRepository.save(boardEntity);

            List<CommentEntity> commentList = commentRepository.findByBoardNumberOrderByWriteDatetimeDesc(boardNumber);
            List<LikyEntity> likyList = likyRepository.findByBoardNumber(boardNumber);

            data = new LikeResponseDto(boardEntity, likyList, commentList);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }
}
