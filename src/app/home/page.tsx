import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const Input = styled('input')({
    display: 'none',
});

const HomePage = () => {
    return (
        <>
            Auth success :)
            <Box>
                <label htmlFor="file-input">
                    <Input accept="image/*" id="file-input" type="file" />
                    <Button variant="contained" component="span">
                        Upload File
                    </Button>
                </label>
            </Box>
        </>
    );
};

export default HomePage;
