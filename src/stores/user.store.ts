import { IUser } from "src/interfaces";
import User from "src/interfaces/User.interface";
import { create } from "zustand";

interface IUserStore{
    user : User | null;
    setUser : (user : User) => void;
    resetUser : () => void;
}

const useStore = create<IUserStore>((set) => ({
    user : null,
    setUser : (user : User) => set((state) => ({...state, user})), //? 인자로 받은 데이터들을 다 저장
    resetUser : () => set((state) => ({...state, user : null})) //? 다 null로 초기화..?
}))

export default useStore;