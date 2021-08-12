import * as Yup from 'yup';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/gm;

export const newUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(30, 'Too Long!'),
  password: Yup.string()
    .matches(passwordRegex, {
      message: 'Password must contain at least 1 capital letter and 1 number',
      excludeEmptyString: true,
    })
    .min(6, 'Password must be longer than 6 symbols')
    .required('Enter password'),
  email: Yup.string()
    .email('Invalid email')
    .required('Enter email'),
});

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .matches(passwordRegex, {
      message: 'Password must contain at least 1 capital letter and 1 number',
      excludeEmptyString: true,
    })
    .required('Enter password'),
  email: Yup.string()
    .email('Invalid email')
    .required('Enter email'),
});

export const newPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short!')
    .max(50, 'Title is too long')
    .required('Enter title'),
  fullText: Yup.string()
    .min(20, 'Description is too short')
    .max(2048, 'Description is too long')
    .required('Enter fulltext'),
  description: Yup.string().max(256, 'Description is too long'),
});

export const newCommentSchema = Yup.object().shape({
  
})