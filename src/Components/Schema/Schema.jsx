import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper letter, 1 lower letter, 1 numeric digit

export const registerSchema = yup.object().shape({
  user_email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  // age: yup
  //   .number()
  //   .positive('Age must be positive')
  //   .integer()
  //   .required('Age is requird'),
  user_name: yup
    .string().min(2).required('Name is requird'),
  user_password: yup
    .string()
    .min(5).required('Name is requird')
    .matches(passwordRegex, { message: 'Please create a strong password' })
    .required('Password is required'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password'), null], 'Password must match')
  //   .required('Confirm password is requird')
})

export const loginSchema = yup.object().shape({
  user_email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  user_password: yup
    .string()
    .min(5).required('Name is requird')
    .matches(passwordRegex, { message: 'Please create a strong password' })
    .required('Password is required'),
})