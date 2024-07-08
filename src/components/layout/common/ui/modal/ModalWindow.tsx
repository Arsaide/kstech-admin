import React, { FC } from 'react';
import { Box, Button, Modal } from '@mui/material';
import Typography from '@mui/material/Typography';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
}

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
            <Box>
                <Typography id={'modal-title'}>{title}</Typography>
                <Box id={'modal-content'}>{children}</Box>
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
