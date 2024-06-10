import RegisterForm from "./RegisterForm";
import { Credentials } from "../models";
import { useRegisterUserAccount } from "./useRegisterUserAccount";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        error
    } = useRegisterUserAccount();

    const handleRegisterAccount = (credentials: Credentials) => {
        mutate(credentials);
    }

    const navigate = useNavigate();

    const handleNavigateToLoginPage = () => {
        navigate("/login")
    }

    return (
        <RegisterForm 
            isError={isError} 
            isSuccess={isSuccess} 
            isLoading={isPending}
            errorMessage={error?.response?.data?.detail}
            onFormSubmit={handleRegisterAccount}
            onLinkClick={handleNavigateToLoginPage}
        />
    );
}

export default RegisterPage;