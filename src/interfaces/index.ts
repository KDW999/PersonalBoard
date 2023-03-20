//? 여러 인터페이스 관리
export interface IPreviewItem {
   img : string | null;
   writerProfile : string;
   writerNickname : string;
   writeDate : string;
   boardTitle : string;
   boardContent : string;
   likeCount : number;
   commentCount : number;
   viewCount : number;
   boardNumber : number;
};

export interface IUser {
    email : string;
    password : string;
    nickname : string;
    telNumber : string;
    address : string;
    addressDetail : string;
    profile? : string;
}

export interface ILikeUser{
    likeUserProfile : string;
    likeUserNickname : string;
}

export interface ICommentItem{
    commentUserPrfoile : string;
    commentUserNickname : string;
    commentContent : string;
    commentDatetime : string;
}