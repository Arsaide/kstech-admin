import React, { useContext, useState } from 'react';
import useGetAllCategories from '../../../../../../hooks/queries/categories/use-get-all-categories/useGetAllCategories';
import List from '@mui/material/List';
import { LinearProgress, ListSubheader } from '@mui/material';
import './CategoriesList.scss';
import { useGetOneCategory } from '../../../../../../hooks/queries/categories/use-get-one-category/useGetOneCategory';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { CategoriesContext } from '../../../../../../providers/CategoriesProvider';
import { GetOneCategoryResponseModel } from '../../../../../../api/models/CategoriesResponseModel';
import CategoryListHeader from './components/category-list-header/CategoryListHeader';
import CategoryItem from './components/category-item/CategoryItem';
import CategoriesItemsSkeleton from './categories-items-skeleton/CategoriesItemsSkeleton';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';
import EditCategoryModal from '../category-modals/EditCategoryModal';
import ModalWindow from '../../../../../layout/common/ui/modal/ModalWindow';
import DeleteCategoryModal from '../category-modals/DeleteCategoryModal';

const CategoriesList = () => {
    const queryClient: QueryClient = useQueryClient();
    const { isOpenCategories, setIsOpenCategories, setCategoryId } =
        useContext(CategoriesContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const {
        isCategoriesLoading,
        isCategoriesError,
        categoriesError,
        categoriesData,
    } = useGetAllCategories();

    const { isLoadingGetCategory, isGetCategoryError, getCategoryError } =
        useGetOneCategory(selectedCategoryId);

    const handleClickOpen = (id: string) => {
        try {
            setIsOpenCategories(prevState => ({
                ...prevState,
                [id]: !prevState[id],
            }));
            const cachedCategoryData =
                queryClient.getQueryData<GetOneCategoryResponseModel>([
                    'get-one-category',
                    id,
                ]);
            if (!cachedCategoryData) {
                setSelectedCategoryId(id);
            }
        } catch (e: any) {
            toast.error(
                'Сталась помилка при рендерінгу підкатегорій. Помилка: ',
                e,
            );
        }
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenDeleteModal(true);
    };

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenEditModal(true);
    };

    return (
        <>
            <CategoryListHeader
                categoryCount={
                    categoriesData?.length ? categoriesData.length : '0'
                }
            />
            <List
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                }}
                component={'nav'}
                aria-labelledby={'list-of-categories'}
                subheader={
                    <ListSubheader component={'div'} id={'list-of-categories'}>
                        Список категорій
                    </ListSubheader>
                }
            >
                {isLoadingGetCategory && (
                    <LinearProgress
                        color="success"
                        sx={{
                            position: 'absolute',
                            top: 45,
                            left: 0,
                            width: '100%',
                            zIndex: 10,
                        }}
                    />
                )}
                {isCategoriesLoading
                    ? Array.from({
                          length: Math.floor(Math.random() * 6) + 5,
                      }).map((_, index) => (
                          <CategoriesItemsSkeleton key={index} />
                      ))
                    : categoriesData?.length &&
                      categoriesData.map((category, categoryIndex) => (
                          <CategoryItem
                              key={category.id}
                              category={category}
                              isOpen={isOpenCategories[category.id]}
                              onToggleOpen={handleClickOpen}
                              onDeleteButtonClick={handleDeleteClick}
                              onEditButtonClick={handleEditClick}
                              categoryIndex={categoryIndex}
                          />
                      ))}
            </List>
            {isGetCategoryError && (
                <Typography color={MainColorsEnum.RED}>
                    {`Сталась помилка під час отримання підкатегорій! Помилка: ${getCategoryError}`}
                </Typography>
            )}
            {isCategoriesError && (
                <Typography color={MainColorsEnum.RED}>
                    {`Сталась помилка під час отримання списка категорій! Помилка: ${categoriesError}`}
                </Typography>
            )}
            <ModalWindow
                isOpen={isOpenDeleteModal}
                handleClose={() => setIsOpenDeleteModal(false)}
                title={'Видалення Категорії'}
            >
                <DeleteCategoryModal />
            </ModalWindow>
            <ModalWindow
                isOpen={isOpenEditModal}
                handleClose={() => setIsOpenEditModal(false)}
                title={'Редагування категорії'}
            >
                <EditCategoryModal />
            </ModalWindow>
        </>
    );
};

export default CategoriesList;
