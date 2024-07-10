import React, { FC, useState } from 'react';
import { SubcategoryResponseModel } from '../../../../../../../../api/models/CategoriesResponseModel';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, ListItemIcon } from '@mui/material';
import { FileBox, Pencil, Trash2 } from 'lucide-react';
import ListItemText from '@mui/material/ListItemText';
import { MainColorsEnum } from '../../../../../../../../utils/enums/colors-enum';
import ModalWindow from '../../../../../../../layout/common/ui/modal/ModalWindow';
import EditSubcategoryModal from '../../../subcategory-modals/EditSubcategoryModal';
import DeleteSubcategoryModal from '../../../subcategory-modals/DeleteSubcategoryModal';

interface SubcategoryItemProps {
    subcategory: SubcategoryResponseModel;
    categoryIndex: number;
    subcategoryIndex: number;
}

const SubcategoryItem: FC<SubcategoryItemProps> = ({
    subcategory,
    categoryIndex,
    subcategoryIndex,
}) => {
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );

    const handleDeleteClick = () => {
        setSelectedCategoryId(subcategory.id);
        setIsOpenDeleteModal(true);
    };

    const handleEditClick = () => {
        setSelectedCategoryId(subcategory.id);
        setIsOpenEditModal(true);
    };

    return (
        <>
            <ListItemButton sx={{ pl: 4 }} key={subcategoryIndex}>
                <ListItemIcon>
                    <FileBox width={20} />
                </ListItemIcon>
                <ListItemText>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <img
                            src={subcategory.iconImg}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px / 6.7px',
                            }}
                            alt={subcategory.subcategory}
                        />
                        {categoryIndex + 1}.{subcategoryIndex + 1}.{' '}
                        {subcategory.subcategory}
                    </Box>
                </ListItemText>
                {subcategory && (
                    <>
                        <div className={'toolIcon'} onClick={handleDeleteClick}>
                            <Trash2 color={MainColorsEnum.RED} />
                        </div>
                        <div className={'toolIcon'} onClick={handleEditClick}>
                            <Pencil />
                        </div>
                    </>
                )}
            </ListItemButton>
            <ModalWindow
                isOpen={isOpenEditModal}
                handleClose={() => setIsOpenEditModal(false)}
                title={'Редагування підкатегорії'}
            >
                <EditSubcategoryModal
                    id={selectedCategoryId}
                    name={subcategory.subcategory}
                    iconImg={subcategory.iconImg}
                    mainImg={subcategory.mainImg}
                />
            </ModalWindow>
            <ModalWindow
                isOpen={isOpenDeleteModal}
                handleClose={() => setIsOpenDeleteModal(false)}
                title={'Видалення підкатегорії'}
            >
                <DeleteSubcategoryModal name={subcategory.subcategory} />
            </ModalWindow>
        </>
    );
};

export default SubcategoryItem;
