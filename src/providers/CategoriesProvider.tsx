import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';

interface CategoriesProviderProps {
    children: ReactNode;
}

interface CategoriesContextProps {
    isVisibleSubcategories: boolean;
    setIsVisibleSubcategories: Dispatch<SetStateAction<boolean>>;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
    isVisibleSubcategories: false,
    setIsVisibleSubcategories: () => null,
});

export const CategoriesProvider: FC<CategoriesProviderProps> = ({
    children,
}) => {
    const [isVisibleSubcategories, setIsVisibleSubcategories] =
        useState<boolean>(false);

    const value = {
        isVisibleSubcategories,
        setIsVisibleSubcategories,
    };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
