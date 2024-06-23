import { Credentials } from "../models";
import { useLogin } from "./useLogin";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

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
                navigate("/sources")
            }
        });
    }

    const navigate = useNavigate();

    const handeNavigateToRegisterPage = () => {
        navigate("/register")
    }

    return (
        <LoginForm
            isError={isError} 
            isLoading={isPending}
            errorMessage={error?.response?.data?.detail}
            onFormSubmit={handleLogin}
            onLinkClick={handeNavigateToRegisterPage}
        />
    );
}

export default LoginPage;