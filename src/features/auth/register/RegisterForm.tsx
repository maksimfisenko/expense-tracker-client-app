import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Credentials } from "../models";

const registerFormSchema = z
    .object({
        username: z.string().email("Nonvalid email"),
        password: z.string().min(8, "Password should contain at least 8 symbols"),
        confirmPassword: z.string().min(8, "Password should contain at least 8 symbols")
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

type RegisterFormData = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    errorMessage?: string;
    onFormSubmit: (credentials: Credentials) => void;
    onLinkClick: () => void;
}

const RegisterForm = ({isError, isSuccess, isLoading, errorMessage, onFormSubmit, onLinkClick} : RegisterFormProps) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormData>({
        mode: "onChange",
        resolver: zodResolver(registerFormSchema)
    });

    return (
        <Flex direction="row" flex="1" align="center" justify="center" textColor="mediumseagreen">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Center backgroundColor="white" maxW="1g" w="1g" shadow="1g" rounded="md" border="2px solid mediumseagreen">
                    <Stack spacing="2" pt="16" pb="16" pl="16" pr="16">
                        <Heading fontSize="2xl">Create a new account</Heading>
                        {isSuccess &&
                            <Box border="2px solid red" rounded="md" pt="1" pb="1" pl="1" pr="1" textAlign="center">
                                <Heading fontSize="xl">Account successfully registered</Heading>
                            </Box>
                        }
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
                        <FormControl isInvalid={!!errors.confirmPassword}>
                            <FormLabel>Confirm your password</FormLabel>
                            <Input id="confirmPassword" type="password" placeholder="********" {...register('confirmPassword')}></Input>
                            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                        </FormControl>
                        <Button colorScheme="green" type="submit" isDisabled={isLoading}>Create account</Button>
                        <Center><Link onClick={onLinkClick}>Already have an account?</Link></Center>
                    </Stack>
                </Center>
            </form>
        </Flex>
    );
};

export default RegisterForm;