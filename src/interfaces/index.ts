//? 여러 인터페이스 관리
export interface IPreviewItem {
   img : string | null;

};

export interface IUser {
    email : string;
    password : string;
    nickname : string;
    telNumber : string;
    address : string;
    addressDetail : string;
    profile : string;
}