import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AxiosErrorResponseData, Credentials } from "../models";
import publicApi from "../../../config/api-client";

const useRegisterUserAccount = () => {
	return useMutation<void, AxiosError<AxiosErrorResponseData>, Credentials>({
		mutationKey: ['register-user-account'],
		mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/accounts/register', credentials)
	});
}

export {useRegisterUserAccount};