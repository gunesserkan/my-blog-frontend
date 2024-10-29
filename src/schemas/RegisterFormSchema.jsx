import * as yup from 'yup'

export const registerFormSchemas = yup.object().shape({
    email: yup.string().email("Please enter a suitable email").required("Email is requarid"),
    age: yup.number().positive("Age must be possitive").integer("Age must be integer").required("Age is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Password confirm is required").oneOf([yup.ref('password', yup.password)], "Passwords do not match"),
    term: yup.boolean().required("You must to accept the terms and conditions")
})