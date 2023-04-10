package com.example.kdw.board2.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import com.example.kdw.board2.entity.BoardEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetLikeTop3ListResponseDto {
    
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImgUrl;
    private String boardWriteDatetime;
    private String writerNickname;
    private String writerProfileUrl;
    private int viewCount;
    private int commentCount;
    private int likeCount;

    public GetLikeTop3ListResponseDto(BoardEntity boardEntity){
        this.boardNumber = boardEntity.getBoardNumber();
        this.boardTitle = boardEntity.getBoardTitle();
        this.boardContent = boardEntity.getBoardContent();
        this.boardImgUrl = boardEntity.getBoardImgUrl();
        this.boardWriteDatetime = boardEntity.getBoardWriteDatetime();
        this.writerNickname = boardEntity.getWriterNickname();
        this.writerProfileUrl = boardEntity.getWriterProfileUrl();
        this.viewCount = boardEntity.getViewCount();
        this.commentCount = boardEntity.getCommentCount();
        this.likeCount = boardEntity.getLikeCount();
    }

    public static List<GetLikeTop3ListResponseDto> copyList(List<BoardEntity> boardEntityList){

        List<GetLikeTop3ListResponseDto> list = new ArrayList<>();

        for(BoardEntity boardEntity : boardEntityList){
            GetLikeTop3ListResponseDto dto = new GetLikeTop3ListResponseDto(boardEntity);
            list.add(dto);
        }
        return list;
    }
}
