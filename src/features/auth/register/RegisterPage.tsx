import RegisterForm from "./RegisterForm";
import { Credentials } from "../models";
import { useRegisterUserAccount } from "./useRegisterUserAccount";

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

    return (
        <RegisterForm 
            isError={isError} 
            isSuccess={isSuccess} 
            isLoading={isPending}
            errorMessage={error?.response?.data?.detail}
            onFormSubmit={handleRegisterAccount}
        />
    );
}

export default RegisterPage;