import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Context } from '../../../api/context';
import { AuthContext } from '../../../providers/AuthProvider';
import { LoginData } from '../../../types/forms/LoginData.types';
import { useMutation } from '@tanstack/react-query';
import AuthForm from './auth-form/AuthForm';

const NotAuth = () => {
    const { store } = useContext(Context);
    const { setIsLoggedIn } = useContext(AuthContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginData>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (user: LoginData) =>
            store.login(user.name, user.password),
        onSuccess: () => {
            setIsLoggedIn(true);
            const loginTime = new Date().getTime();
            localStorage.setItem('loginTime', loginTime.toString());
        },
    });

    const onSubmit = (data: LoginData) => {
        mutate(data);
    };

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <AuthForm
                handleSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
                isPending={isPending}
                isError={isError}
                error={error}
            />
        </Container>
    );
};

export default NotAuth;
