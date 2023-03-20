import { ICommentItem, IPreviewItem } from "src/interfaces";
import { useState } from 'react';

const usePagingHook = (COUNT : number) => {
    const [boardList, setBoardList] = useState<(IPreviewItem | ICommentItem)[]>([]);
}

export default usePagingHook;