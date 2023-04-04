package com.example.kdw.board2.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.kdw.board2.dto.request.board.PostBoardRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Board2")
@Table(name = "Board2")
public class BoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImgUrl;
    private String boardWriteDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileUrl;
    private int commentCount;
    private int likeCount;
    private int viewCount;

    //? DB에 있는 Board 정보에 대한 데이터 다루기
    public BoardEntity(UserEntity userEntity, PostBoardRequestDto postBoardRequestDto){

        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.boardTitle = postBoardRequestDto.getBoardTitle();
        this.boardContent = postBoardRequestDto.getBoardContent();
        this.boardImgUrl = postBoardRequestDto.getBoardImgUrl();
        this.boardWriteDatetime = simpleDateFormat.format(now);
        this.writerEmail = userEntity.getEmail();
        this.writerNickname = userEntity.getNickname();
        this.writerProfileUrl = userEntity.getProfile();
        this.viewCount = 0;
        this.commentCount = 0;
        this.likeCount = 0;
    }

    public void increaseViewCount(){
        this.viewCount++;
    }
    public void increaseCommentCount(){
        this.commentCount++;
    }
    public void increaseLikeCount(){
        this.likeCount++;
    }
}
