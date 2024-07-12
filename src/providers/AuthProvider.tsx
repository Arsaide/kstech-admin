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
import { observer } from 'mobx-react-lite';
import { useMutation } from '@tanstack/react-query';
import { Context } from '../api/context';
import useSetLocalStorage from '../hooks/useSetLocalStorage/useSetLocalStorage';
import { formatTime } from '../utils/formatTime';

interface IAuthContext {
    isLoggedIn: boolean;
    isPending: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    remainingTime: string;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    isPending: false,
    setIsLoggedIn: () => null,
    remainingTime: '',
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useSetLocalStorage<boolean>(
        'isLoggedIn',
        false,
    );
    const [remainingTime, setRemainingTime] = useState<string>('');

    const token = localStorage.getItem('token');

    const { mutate, isPending } = useMutation({
        mutationKey: ['check user'],
        mutationFn: async () => {
            await store.checkUser(token);
        },
        onSuccess: () => {
            setIsLoggedIn(true);
        },
        onError: () => {
            setIsLoggedIn(false);
        },
    });

    useEffect(() => {
        mutate();
    }, [token, isLoggedIn]);

    useEffect(() => {
        const checkLoginTime = () => {
            const loginTime = localStorage.getItem('loginTime');
            if (loginTime && isLoggedIn) {
                const currentTime = new Date().getTime();
                const timeDifference = currentTime - parseInt(loginTime, 10);
                const time = 60 * 60 * 1000;

                if (timeDifference >= time) {
                    store.logout();
                    setIsLoggedIn(false);
                    localStorage.removeItem('loginTime');
                } else {
                    const remainingSeconds = (time - timeDifference) / 1000;
                    setRemainingTime(formatTime(Math.floor(remainingSeconds)));
                }
            }
        };

        const interval = setInterval(checkLoginTime, 1000);

        return () => clearInterval(interval);
    }, [isLoggedIn]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isPending,
        remainingTime,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
