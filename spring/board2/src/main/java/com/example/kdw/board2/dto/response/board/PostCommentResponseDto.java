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
public class PostCommentResponseDto {
    //? 댓글 달 때 돌려줄 데이터는 board, commentList, LikeList(?)
    private BoardEntity board;

    private List<LikyEntity> likeList;

    private List<CommentEntity> commentList;
}
