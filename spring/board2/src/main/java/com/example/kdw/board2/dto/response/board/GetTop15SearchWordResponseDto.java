package com.example.kdw.board2.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import com.example.kdw.board2.entity.BoardEntity;
import com.example.kdw.board2.entity.resultSet.SearchWordResultSet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetTop15SearchWordResponseDto {
    
    private List<String> top15SearchWordList;

    public static GetTop15SearchWordResponseDto copyList(List<SearchWordResultSet> list){
        
        List<String> result = new ArrayList<>();

        for(SearchWordResultSet item : list){ //? 뭐지? 이해 안되네;
            result.add(item.getSearchWord()); //? 단어 넣기
        }

        return new GetTop15SearchWordResponseDto(result);
    }
}
