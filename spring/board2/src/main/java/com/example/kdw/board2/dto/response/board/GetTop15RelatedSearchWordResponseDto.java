package com.example.kdw.board2.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import com.example.kdw.board2.entity.resultSet.RelatedSearchWordResultSet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetTop15RelatedSearchWordResponseDto {
    
    private List<String> top15SEarchWordList;

    public static GetTop15RelatedSearchWordResponseDto copyList(List<RelatedSearchWordResultSet> list){

        List<String> result = new ArrayList<>();

        for(RelatedSearchWordResultSet item : list){
            result.add(item.getPreviousSearchWord());
        }
        return new GetTop15RelatedSearchWordResponseDto(result);
    }
}
