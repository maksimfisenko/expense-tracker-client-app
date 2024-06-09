import { Credentials } from "../models";
import { useLogin } from "./useLogin";
import LoginForm from "./LoginForm";

const LoginPage = () => {

    const {
        mutate,
        isPending,
        isError,
        error
    } = useLogin();

    const handleLogin = (credentials: Credentials) => {
        mutate(credentials, {
            onSuccess: (accessToken) => {
                console.log('accessToken', accessToken)
            }
        });
    }

    return (
        <LoginForm
            isError={isError} 
            isLoading={isPending}
            errorMessage={error?.response?.data?.detail}
            onFormSubmit={handleLogin}
        />
    );
}

export default LoginPage;