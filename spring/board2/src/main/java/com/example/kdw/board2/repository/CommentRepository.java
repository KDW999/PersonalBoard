package com.example.kdw.board2.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kdw.board2.entity.CommentEntity;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer>{
    
    public List<CommentEntity> findByBoardNumberOrderByWriteDatetimeDesc(int boardNumber);
    //? OrderBy 특정 컬럼 기준으로 정렬, Desc 내림차순

    @Transactional
    public void deleteByBoardNumber(int boardNumber);
}
