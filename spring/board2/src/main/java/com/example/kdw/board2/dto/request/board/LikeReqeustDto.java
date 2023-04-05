package com.example.kdw.board2.dto.request.board;

import javax.validation.constraints.Min;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikeReqeustDto {
    
    @Min(1)
    private int boardNumber;
}
