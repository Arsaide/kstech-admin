import styled from '@emotion/styled';
import { Button, TextField, TextFieldProps } from '@mui/material';
import { ElementType, FC } from 'react';

export const FormattedTextContainer = styled.div`
    position: relative;
`;

export const StyledTextFieldMultiline = styled(
    TextField as FC<TextFieldProps & { component?: ElementType<any> }>,
)`
    width: 100%;
    .MuiInputBase-root {
        padding-bottom: 50px;
    }
`;

export const ActionsContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    padding: 5px;
`;

export const ToolsButton = styled(Button)`
    min-width: 30px;
    padding: 5px;
`;
