import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../../main.tsx';

interface LoginData {
    name: string;
    password: string;
}

const HomePage = () => {
    const { store } = useContext(Context);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginData>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (user: LoginData) =>
            store.login(user.name, user.password),
    });

    const onSubmit = (data: LoginData) => {
        mutate(data);
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 }}
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
                                label="Name"
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
                                label="Password"
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
                    {isPending && <CircularProgress />}
                    {isError && (
                        <Alert severity="error">
                            LogIn error: {error?.message}
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
                        LogIn
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
