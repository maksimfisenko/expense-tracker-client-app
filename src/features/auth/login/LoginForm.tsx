import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Credentials } from "../models";

const loginFormSchema = z
    .object({
        username: z.string().email("Nonvalid email"),
        password: z.string().min(8, "Password should contain at least 8 symbols"),
    });

type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
    isError: boolean;
    isLoading: boolean;
    errorMessage?: string;
    onFormSubmit: (credentials: Credentials) => void;
}

const LoginForm = ({isError, isLoading, errorMessage, onFormSubmit} : LoginFormProps) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormData>({
        mode: "onChange",
        resolver: zodResolver(loginFormSchema)
    });

    return (
        <Flex flex="1" align="center" justify="center" textColor="green">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Center>
                    <Stack borderColor="black">
                        <Heading fontSize="2xl">Sign in</Heading>
                        {isError &&
                            <Box>
                                <Heading fontSize="2xl" color="red">{errorMessage}</Heading>
                            </Box>
                        }
                        <FormControl isInvalid={!!errors.username}>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" type="email" placeholder="example@mail.com" {...register('username')}></Input>
                            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input id="password" type="password" placeholder="********" {...register('password')}></Input>
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>
                        <Button colorScheme="green" type="submit" isDisabled={isLoading}>Sign in</Button>
                        <Link>Don't have an account?</Link>
                    </Stack>
                </Center>
            </form>
        </Flex>
    );
};

export default LoginForm;