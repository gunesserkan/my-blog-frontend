import * as yup from 'yup'

export const registerFormSchemas = yup.object().shape({
    name: yup.string().required("Username is requarid").min(3, "Name must be longer than 3 characters"),
    username: yup.string().required("Username is requarid"),
    password: yup.string().required("Password is required").min(6, "Password must be longer than 6 characters"),
    confirmPassword: yup.string().required("Password confirm is required").oneOf([yup.ref('password', yup.password)], "Passwords do not match"),
    email: yup.string().email("Please enter a suitable email").required("Email is requarid"),
    // term: yup.boolean().required("You must to accept the terms and conditions")
})