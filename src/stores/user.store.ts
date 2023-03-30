import { IUser } from "src/interfaces";
import { create } from "zustand";

interface IUserStore{
    user : IUser | null;
    setUser : (user : IUser) => void;
    resetUser : () => void;
}

const useStore = create<IUserStore>((set) => ({
    user : null,
    setUser : (user : IUser) => set((state) => ({...state, user})), //? 인자로 받은 데이터들을 다 저장
    resetUser : () => set((state) => ({...state, user : null})) //? 다 null로 초기화..?
}))

export default useStore;