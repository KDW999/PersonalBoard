package com.example.kdw.board2.dto.response.board;

import java.util.List;

import com.example.kdw.board2.entity.BoardEntity;
import com.example.kdw.board2.entity.CommentEntity;
import com.example.kdw.board2.entity.LikyEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBoardResponseDto {
    //? 게시글 조회 시 게시글 정보(BoardEntity), 좋아요과 댓글 반송
    
    private BoardEntity board;
    private List<LikyEntity> likeList;
    private List<CommentEntity> commentList;

}
