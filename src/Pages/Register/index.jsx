import './index.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Components/BaseUrl';
import { useFormik } from 'formik';
import { registerSchema } from './../../Components/Schema/Schema';
const Register = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {

    axios.post(`${baseUrl}/users/store`, values).then((res) => {
      if (res.data.err) {
        alert('This email is already taken');
      } else {
        alert('Register Done');
        navigate('/login');
        actions.resetForm();
      }
    }).catch((err) => {
      alert(err)
    })
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      user_name: '',
      user_password: '',
      user_email: ''
    },
    validationSchema: registerSchema,
    onSubmit
  });


  return (
    <div className='register' id='register'>
      <div className="container">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className='col-8 d-flex flex-column justify-content-center mx-auto'
          >
            <input
              type="email"
              name='user_email'
              placeholder='Enter your email'
              value={values.user_email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.user_email && touched.user_email && 'border-danger'
              }
            />
            {
              errors.user_email && touched.user_email &&
              <p className='error'>{errors.user_email}</p>
            }
            <input
              type="text"
              name='user_name'
              placeholder='name'
              value={values.user_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.user_name && touched.user_name && 'border-danger'
              }
            />
            {
              errors.user_name && touched.user_name &&
              <p className='error'>{errors.user_name}</p>
            }
            <input
              type="password"
              name='user_password'
              placeholder='password'
              value={values.user_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.user_password && touched.user_password && 'border-danger'
              }
            />
            {
              errors.user_password && touched.user_password &&
              <p className='error'>{errors.user_password}</p>
            }
            <button disabled={isSubmitting} type='submit'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register