package com.example.kdw.board2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.kdw.board2.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
    
    public UserEntity findByEmail(String email);
    
    public boolean existsByEmail(String email);
    public boolean existsByNickname(String nickname);
    public boolean existsByTelNumber(String telNumber);
    
    
}
