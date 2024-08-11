import * as Yup from 'yup';

export const LoginValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Enter email'),
    password: Yup.string().required('Enter password'),
});

export const SignUpvalidation = Yup.object({
    username: Yup.string().required("Please enter name"),
    email: Yup.string().email('Invalid email address').required('Enter email'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Enter password'),
    
})

  