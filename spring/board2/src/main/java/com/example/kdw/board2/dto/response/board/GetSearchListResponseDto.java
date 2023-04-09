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
public class GetSearchListResponseDto {
    
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImgUrl;
    private String boardWriteDatetime;
    private String writerNickname;
    private String writerProfileUrl;
    private int viewcount;
    private int commentCount;
    private int likeCount;

    public GetSearchListResponseDto(BoardEntity boardEntity){
        this.boardNumber = boardEntity.getBoardNumber();
        this.boardTitle = boardEntity.getBoardTitle();
        this.boardContent = boardEntity.getBoardContent();
        this.boardImgUrl = boardEntity.getBoardImgUrl();
        this.boardWriteDatetime = boardEntity.getBoardWriteDatetime();
        this.writerNickname = boardEntity.getWriterNickname();
        this.writerProfileUrl = boardEntity.getWriterProfileUrl();
        this.viewcount = boardEntity.getViewCount();
        this.commentCount =  boardEntity.getCommentCount();
        this.likeCount = boardEntity.getLikeCount();
    }

    //? 리스트 형태로 저장된 데이터 가져와서 리스트 형태로 클라이언트에게 보여주기
    public static List<GetSearchListResponseDto> copy(List<BoardEntity> boardEntityList){
        
        List<GetSearchListResponseDto> list = new ArrayList<>();

        for(BoardEntity boardEntity : boardEntityList){
            GetSearchListResponseDto dto = new GetSearchListResponseDto(boardEntity);
            list.add(dto);
        }

        return list;
    }
}
