import React, { FC } from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 1,
};

const ModalWindow: FC<ModalProps> = ({
    isOpen,
    handleClose,
    title,
    children,
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby={'modal-title'}
            aria-describedby={'modal-description'}
        >
            <Box sx={style}>
                <Typography
                    id={'modal-title'}
                    variant={'h5'}
                    sx={{ textAlign: 'center' }}
                >
                    {title}
                </Typography>
                <Divider
                    component="div"
                    sx={{ mb: 1, borderColor: 'rgba(0, 0, 0, 0.32)' }}
                />
                <Box id={'modal-content'}>{children}</Box>
                <Button onClick={handleClose}>
                    Закрити
                    <X />
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
