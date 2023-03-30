import { ICommentItem, IPreviewItem } from "src/interfaces";
import { useEffect, useState } from 'react';

const usePagingHook = (COUNT : number) => {
    const [boardList, setBoardList] = useState<(IPreviewItem | ICommentItem)[]>([]);
    const [viewList, setViewList] = useState<(IPreviewItem | ICommentItem)[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);

    //? 한 페이지에 게시물을 5개만 보여주고 싶을 때
    //? 배열 시작 인덱스 : 5 * pageNumber - 5 → 5 * (pageNumber -1)
    //? 배열의 마지막 인덱스 : 5 * pageNumber - 1

    const onPageHandler = (page : number) => { //? 동작 후 작용하는 걸 방지하고 싶을 땐 변수 지정해서 사용?
       setPageNumber(page);
       const tempList : (IPreviewItem | ICommentItem)[] = [];
       const startIndex = COUNT * (page-1);
       const endIndex = COUNT * page -1;

       for(let index = startIndex; index <= endIndex; index++){
           if(boardList.length < index + 1) break;
           tempList.push(boardList[index]);
       }

       setViewList(tempList);
    };

    useEffect(() => { // 처음 한 번은 무조건 돌고 대괄호 안에 상태 변경 시 또 실행
        onPageHandler(pageNumber);
    }, [boardList]);

   return { COUNT, boardList, viewList, pageNumber, onPageHandler, setBoardList}; // 중괄호로 반환 시 객체로 받기로 정한 이름으로만 사용
}  // 대괄호는 이름 바꿔서 사용 가능

export default usePagingHook;