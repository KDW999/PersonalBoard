//? 여러 일반 함수 관리

export const getPageCount = (list : any[], count : number) => {
       return Math.floor((list.length-1) / count) + 1;
}

export const getExpires = (expiredTime : number) => {
       const now = new Date().getTime();
       const expires = new Date(now + expiredTime);
       return expires;
}