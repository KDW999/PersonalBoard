package com.example.kdw.board2.entity.primaryKey;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class LikyPk implements Serializable{
    
    private String userEmail;
    private int boardNumber;

}
