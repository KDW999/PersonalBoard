//@ 자바 클래스 or 리액트의 컴포넌트 파일명은 Upper CamelCase를 따름
//# ts의 경우 특별한 파일의 네이밍 규칙이 지정되어있지 않아서
//# 꼭 UpperCamelCase를 사용할 필요 X

//@ Zustand를 사용하여 스토어 생성
//? zustand는 상태 관리를 도와주는 외부 라이브러리
//? zustand에서 create 요소를 import

import { create } from "zustand";

//# ts에서 함수 타입 지정하는 법
//? (매개변수명 : 매개변수 타입) => 반환타입
//? 클래스의 타입은 인터페이스, 객체 타입을 지정할 땐 인터페이스

interface ISignUpStore {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail: string;

    // (email : string) => void, (password : string) => void 매개변수는 string에 반환타입이 void
    // 매개변수명만 다를 뿐 매개변수 타입은 같고, 반환타입은 void 오버로드와 유사?
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setPasswordCheck: (passwordCheck: string) => void
    setNickname: (nickname: string) => void
    setTelNumber: (telNumber: string) => void
    setAddress: (address: string) => void
    setAddressDetail: (addressDetail: string) => void
}

const useStore = create<ISignUpStore>((set) => ({ // 커스텀 Hook 함수
    //? 상태의 이름 정의
    //? 상태 변수 선언
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    telNumber: '',
    address: '',
    addressDetail: '',

    //? set 메서드 선언
    setEmail: (email) => set((state) => ({ ...state, email })),
    setPassword: (password) => set((state) => ({ ...state, password })),
    setPasswordCheck: (passwordCheck) => set((state) => ({ ...state, passwordCheck })),
    setNickname: (nickname) => set((state) => ({ ...state, nickname })),
    setTelNumber: (telNumber) => set((state) => ({ ...state, telNumber })),
    setAddress: (address) => set((state) => ({ ...state, address })),
    setAddressDetail: (addressDetail) => set((state) => ({ ...state, addressDetail }))

}))

export default useStore;

//# 일반적 상태 코드
//? const [상태, set메서드] = useState<데이터 타입>(초기화);

//# Zustand를 사용해서 상태를 선언하는 코드
//?        Zustand에선 상태를 한 번에 여러 개 만들 수 있다
//? const useStore = create<데이터 타입>((set) => ({
//?        상태명1    초기화값,
//?        상태명2    초기화값,
//?        ...
//?
//?        set상태명1(상태를 변경하는 메서드): (파라미터) => set((state) => ({...state, 파라미터})),
//?        set상태명2(상태를 변경하는 메서드): (파라미터) => set((state) => ({...state, 파라미터})),
//?        ...,


//?        set상태명1(상태를 변경하는 메서드): (상태명1) => set((state) => ({...state, 상태명1})),
//?        특정 상태명 이름으로 메서드를 만들면 그 상태명에 대해서만 적용하는 메서드
//?        
//?        set상태명(상태를 변경하는 메서드): (파라미터) => set((state) => ({...state, 파라미터})),
//?        따로 특정 상태명을 지정하지 않으면 전체에 적용하는 메서드

//?        set상태명(상태를 변경하는 메서드): (파라미터) => set((state) => ({...state, 상태명1, 상태명2})),
//?        여러 개 중 특정 갯수만 적용도 가능
//? }));

//? ...state는 비할당구조 
/* const{
    상태명1: 초기값
    상태명2: 초기값
    ...
}
*/
//? ({...state, 상태명1})) -> 상태명1을 메인으로 지정하고 나머지 상태명들을 ...state으로 하나의 객체에 짱 박아버림
   
//^ 1. Zustand - const useStore = create((set) => ({ ... }))
//^   기존상태 - useState

//^ 2. Zustand - 상태명 : 초기화값,
//^    기존상태 - [상태명, ...] = ...(초기화값)

//^ 3. Zustand - set메서드 : (파라미터) => set((state) => ({...state, 파라미터}))
//^    기존상태 - : [..., set메서드]

//? const {요소1, 요소2, ...} = 객체;
//? ...객체 : 객체에서 지정한 요소를 제외하고 남은 요소를 객체로 묶음 처리함
//? const {요소1, ...묶음 객체명 } = 객체;