export const RequiredRule = {
    required: "This field is required"
}

export const PasswordRule = {
    ...RequiredRule,
    minLength: {
        value: 6,
        message: "Password must be at least 6 characters long"
    }
}