import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Context } from '../../../main.tsx';
import { LoginData } from '../../../types/LoginData.types.ts';
import { useMutation } from '@tanstack/react-query';
import AuthForm from './auth-form/AuthForm.tsx';
import { AuthContext } from '../../../utils/providers/AuthProvider.tsx';

const NotAuthPage = () => {
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
        onSuccess: () => setIsLoggedIn(true),
    });

    const onSubmit = (data: LoginData) => {
        mutate(data);
    };

    return (
        <Container>
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

export default NotAuthPage;
