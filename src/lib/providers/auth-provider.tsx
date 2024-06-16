import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Context } from '../../main.tsx';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@tanstack/react-query';

interface IAuthContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    setIsLoggedIn: () => null,
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const token = localStorage.getItem('token');

    const { mutate, isPending } = useMutation({
        mutationKey: ['check user'],
        mutationFn: async () => {
            await store.checkUser(token);
        },
        onSuccess: () => {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
        },
        onError: () => {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
        },
    });

    useEffect(() => {
        mutate();
    }, [token]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isPending,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
