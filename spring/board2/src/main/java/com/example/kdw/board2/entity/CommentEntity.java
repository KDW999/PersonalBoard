package com.example.kdw.board2.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.stream.events.Comment;

import com.example.kdw.board2.dto.request.board.PostCommentRequestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Comment")
@Table(name = "Comment")
public class CommentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNumber;
    private String commentContent;
    private String writerEmail;
    private String writeDatetime;
    private String writerProfileUrl;
    private String writerNickname;
    private int boardNumber;
    
    public CommentEntity(UserEntity userEntity, PostCommentRequestDto dto){
        Date now = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.commentContent = dto.getCommentContent();
        this.writerEmail = userEntity.getEmail();
        this.writeDatetime = simpleDateFormat.format(now);
        this.writerProfileUrl = userEntity.getProfile();
        this.writerNickname = userEntity.getNickname();
        this.boardNumber = dto.getBoardNumber();
    }
}
