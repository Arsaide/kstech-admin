import { BaseSyntheticEvent, FC } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Alert, Button, LinearProgress, TextField } from '@mui/material';
import { LoginData } from '../../../../types/forms/LoginData.types';

interface AuthFormProps {
    handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    control: Control<LoginData>;
    errors: FieldErrors<LoginData>;
    isPending: boolean;
    isError: boolean;
    error: any;
}

const AuthForm: FC<AuthFormProps> = ({
    handleSubmit,
    control,
    error,
    isPending,
    isError,
    errors,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: 'center' }}
            >
                Форма авторизації
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '450px', mt: 1 }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Логін"
                            autoFocus
                            error={!!errors.name}
                            helperText={
                                errors.name
                                    ? (errors.name.message as string)
                                    : ''
                            }
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Required field' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={
                                errors.password
                                    ? (errors.password.message as string)
                                    : ''
                            }
                        />
                    )}
                />
                {isPending && (
                    <LinearProgress sx={{ width: '100%' }} color="success" />
                )}
                {isError && (
                    <Alert severity="error">
                        Помилка авторизації: {error?.message}
                    </Alert>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isPending}
                >
                    Увійти
                </Button>
            </Box>
        </Box>
    );
};

export default AuthForm;
