import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useMutation } from '@tanstack/react-query';
import { Context } from '../api/context';
import useSetLocalStorage from '../hooks/useSetLocalStorage/useSetLocalStorage';

interface IAuthContext {
    isLoggedIn: boolean;
    isPending: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    isPending: false,
    setIsLoggedIn: () => null,
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useSetLocalStorage<boolean>(
        'isLoggedIn',
        false,
    );
    const [remainingTime, setRemainingTime] = useSetLocalStorage<number>(
        'remainingTime',
        3600,
    );

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
        let interval: NodeJS.Timeout | undefined;

        if (isLoggedIn) {
            interval = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        setIsLoggedIn(false);
                        store.logout();
                        if (interval) {
                            clearInterval(interval);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setRemainingTime(3600);
            if (interval) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoggedIn]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isPending,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
