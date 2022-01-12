import { ButtonGroup, Typography } from "@mui/material";
import { NextPage } from "next";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/atoms/Button";
import InputField from "../components/styled/InputField.styled.";
import { PasswordRule, RequiredRule } from "../rules";
import Flex from "../components/styled/Flex.styled";
import { registerUser } from "../store/User/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store";
import { IRegister, IUserState } from "../typescript";
import DivError from "../components/atoms/DivError";
import { useRouter } from "next/router";
import { useCallback } from "react";


const onError: SubmitErrorHandler<IRegister> = (error) => {
    console.error(error);
}

const Register: NextPage = () => {
    
    const { isFetching, error } = useSelector<TRootState, IUserState>(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const form = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            passwordCheck: ""
        }
    });
    
    const onValid: SubmitHandler<IRegister> = useCallback((credentials) => {
        dispatch(registerUser(credentials, () => router.replace({
            pathname: "/"
        })));
    }, [router]);

    const handleRedirect = useCallback(() => {
        router.replace({
            pathname: "/login"
        });
    }, [router]);

    return (
        <Flex direction="column" alignItems="center" gap="5px" margin="5vh 0 0 0">
            <Typography variant="h2">Shipper</Typography>

            <Typography variant="h4">Register</Typography>

            {error !== null && (
                <DivError>{error}</DivError>
            )}

            <form className="form-container" onSubmit={form.handleSubmit(onValid, onError)}>
                
                <Flex direction="column" gap="1rem" width="max-content">
                    <Controller 
                        name="name"
                        control={form.control}
                        rules={RequiredRule}
                        render={({ field, fieldState }) => (
                            <InputField 
                                {...field}
                                label="Name"
                                type="text"
                                error={Boolean(fieldState.error)}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller 
                        name="email"
                        control={form.control}
                        rules={RequiredRule}
                        render={({ field, fieldState }) => (
                            <InputField 
                                {...field}
                                label="Email"
                                type="email"
                                error={Boolean(fieldState.error)}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller 
                        name="username"
                        control={form.control}
                        rules={RequiredRule}
                        render={({ field, fieldState }) => (
                            <InputField 
                                {...field}
                                label="Username"
                                type="text"
                                error={Boolean(fieldState.error)}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller 
                        name="password"
                        control={form.control}
                        rules={PasswordRule}
                        render={({ field, fieldState }) => (
                            <InputField 
                                {...field}
                                type="password"
                                label="Password"
                                error={Boolean(fieldState.error)}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller 
                        name="passwordCheck"
                        control={form.control}
                        rules={PasswordRule}
                        render={({ field, fieldState }) => (
                            <InputField 
                                {...field}
                                type="password"
                                label="Re-enter Password"
                                error={Boolean(fieldState.error)}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <ButtonGroup>
                        <Button
                            disabled={isFetching}
                            type="submit"
                            bgColor="secondary"
                        >
                            {isFetching ? "Loading" : "Register"} 
                        </Button>
                        <Button 
                            disabled={isFetching}
                            onClick={handleRedirect}
                            bgColor="primary"
                        >
                            Login insted
                        </Button>
                    </ButtonGroup>

                </Flex>
            </form>
        </Flex>
    );
}

export default Register;