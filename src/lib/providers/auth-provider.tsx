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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isLoggedIn');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationKey: ['check user'],
        mutationFn: async () => store.checkUser(),
    });

    useEffect(() => {
        const fetchRequest = () => {
            mutate();
            if (isSuccess) {
                setIsLoggedIn(true);
            } else if (isError) {
                setIsLoggedIn(false);
            }
        };
        fetchRequest();
    }, []);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isPending,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
