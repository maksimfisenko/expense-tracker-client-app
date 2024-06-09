import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AccessToken, AxiosErrorResponseData, Credentials } from "../models";
import publicApi from "../../../config/api-client";

const useLogin = () => {
    return useMutation<AccessToken, AxiosError<AxiosErrorResponseData>, Credentials>({
        mutationKey: ['login'],
        mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/authentication/access-token', credentials)
    })
}

export {useLogin};