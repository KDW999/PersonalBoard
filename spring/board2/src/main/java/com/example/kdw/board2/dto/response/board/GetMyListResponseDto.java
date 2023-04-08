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
public class GetMyListResponseDto {
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImgUrl;
    private String boardWriteDatetime;
    private String writerNickname;
    private String writerProfileUrl;
    private int commentCount;
    private int likeCount;
    private int viewCount;

    public GetMyListResponseDto(BoardEntity boardEntity){
        this.boardNumber = boardEntity.getBoardNumber();
        this.boardTitle = boardEntity.getBoardTitle();
        this.boardContent = boardEntity.getBoardContent();
        this.boardImgUrl = boardEntity.getBoardImgUrl();
        this.boardWriteDatetime = boardEntity.getBoardWriteDatetime();
        this.writerNickname = boardEntity.getWriterNickname();
        this.writerProfileUrl =boardEntity.getWriterProfileUrl();
        this.commentCount = boardEntity.getCommentCount();
        this.likeCount = boardEntity.getLikeCount();
        this.viewCount = boardEntity.getViewCount();
    }

    public static List<GetMyListResponseDto> copyList(List<BoardEntity> boardEntityList){

        List<GetMyListResponseDto> list = new ArrayList<>();

        for(BoardEntity boardEntity : boardEntityList){
            GetMyListResponseDto dto = new GetMyListResponseDto();
            list.add(dto);
        }
        return list;
    }
}
