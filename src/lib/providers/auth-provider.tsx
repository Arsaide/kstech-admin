import { IUser } from "../../types/IUser.types.ts";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";

interface IAuthContext {
    isLoggedIn: boolean;
    user: IUser | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    // checkAuthAndFetchUser: () => Promise<void>;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: () => null,
    // checkAuthAndFetchUser: async () => {}
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem("isLoggedIn");
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [user, setUser] = useState<IUser | null>(null);


    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        // checkAuthAndFetchUser,
    }

    return(
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};
