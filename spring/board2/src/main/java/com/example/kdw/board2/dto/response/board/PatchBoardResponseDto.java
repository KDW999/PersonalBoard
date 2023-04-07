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
public class PatchBoardResponseDto {
    
    private BoardEntity board;

    private List<LikyEntity> likyList;

    private List<CommentEntity> commentList;
}
