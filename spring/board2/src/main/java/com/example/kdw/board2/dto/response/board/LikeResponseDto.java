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
public class LikeResponseDto {
    //? 좋아요 누를 때 게시물 데이터와 좋아요, 댓글 데이터 전달
    private BoardEntity board;
    private List<LikyEntity> likeList;
    private List<CommentEntity> commentList;

}
