CREATE DATABASE BOARD2;
USE BOARD2;

CREATE TABLE BOARD2 (
   board_number INT NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
   board_title TEXT NOT NULL COMMENT '게시물 제목',
   board_content TEXT NOT NULL COMMENT '게시물 내용',
   board_img_url TEXT NULL COMMENT '게시물 이미지 URL',
   board_write_datetime DATETIME NULL DEFAULT now() COMMENT '게시물 작성 날짜 및 시간',
   
   writer_email VARCHAR(45) NOT NULL COMMENT '작성자 이메일',
   writer_nickname VARCHAR(45) NOT NULL COMMENT '작성자 닉네임',
   writer_profile_url TEXT NULL,
   view_count INT NULL DEFAULT 0 COMMENT '게시물 조회수',
   comment_count INT NOT NULL DEFAULT 0 COMMENT '댓글 수',
   like_count INT NOT NULL DEFAULT 0 COMMENT '좋아요 수'
);