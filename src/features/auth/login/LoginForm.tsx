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
    onLinkClick: () => void;
}

const LoginForm = ({isError, isLoading, errorMessage, onFormSubmit, onLinkClick} : LoginFormProps) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormData>({
        mode: "onChange",
        resolver: zodResolver(loginFormSchema)
    });

    return (
        <Flex direction="row" flex="1" align="center" justify="center" textColor="mediumseagreen">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Center backgroundColor="white" maxW="1g" w="1g" shadow="1g" rounded="md" border="2px solid mediumseagreen">
                    <Stack spacing="2" pt="16" pb="16" pl="16" pr="16">
                        <Heading fontSize="2xl">Sign in</Heading>
                        {isError &&
                            <Box border="2px solid red" rounded="md" pt="1" pb="1" pl="1" pr="1" textAlign="center">
                                <Heading fontSize="xl" color="red">{errorMessage}</Heading>
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
                        <Center><Link onClick={onLinkClick}>Don't have an account?</Link></Center>
                    </Stack>
                </Center>
            </form>
        </Flex>
    );
};

export default LoginForm;