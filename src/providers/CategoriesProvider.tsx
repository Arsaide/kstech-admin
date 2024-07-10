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
    categoryId: string | null;
    setCategoryId: Dispatch<SetStateAction<string | null>>;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
    isVisibleSubcategories: false,
    setIsVisibleSubcategories: () => null,
    isOpenCategories: {},
    setIsOpenCategories: () => null,
    categoryId: null,
    setCategoryId: () => null,
});

export const CategoriesProvider: FC<CategoriesProviderProps> = ({
    children,
}) => {
    const [isVisibleSubcategories, setIsVisibleSubcategories] =
        useState<boolean>(false);
    const [isOpenCategories, setIsOpenCategories] = useState<
        Record<string, boolean>
    >({});
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const value = {
        isVisibleSubcategories,
        setIsVisibleSubcategories,
        isOpenCategories,
        setIsOpenCategories,
        categoryId,
        setCategoryId,
    };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
