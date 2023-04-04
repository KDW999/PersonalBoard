package com.example.kdw.board2.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.kdw.board2.entity.LikyEntity;
import com.example.kdw.board2.entity.primaryKey.LikyPk;

@Repository
public interface LikyRepository extends JpaRepository<LikyEntity, LikyPk>{
    
    public List<LikyEntity> findByBoardNumber(int boardNumber);
    public LikyEntity findByUserEmailAndBoardNumber(String email, int boardNumber);

    @Transactional
    public void deleteByBoardNumber(int boardNumber);
}
