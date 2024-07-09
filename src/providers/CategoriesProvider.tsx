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
    isOpenCategories: Record<string, boolean>;
    setIsOpenCategories: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
    isVisibleSubcategories: false,
    setIsVisibleSubcategories: () => null,
    isOpenCategories: {},
    setIsOpenCategories: () => null,
});

export const CategoriesProvider: FC<CategoriesProviderProps> = ({
    children,
}) => {
    const [isVisibleSubcategories, setIsVisibleSubcategories] =
        useState<boolean>(false);
    const [isOpenCategories, setIsOpenCategories] = useState<
        Record<string, boolean>
    >({});

    const value = {
        isVisibleSubcategories,
        setIsVisibleSubcategories,
        isOpenCategories,
        setIsOpenCategories,
    };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
