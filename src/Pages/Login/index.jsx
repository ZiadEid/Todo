import './index.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Components/BaseUrl';
import { useFormik } from 'formik';
import { loginSchema } from '../../Components/Schema/Schema';
const Login = () => {
  const navigate = useNavigate()

  const onSubmit = (values, actions) => {
    axios.post(`${baseUrl}/users/auth`, values).then((res) => {
      if (res.data.err) {
        alert(res.data.msg);
      } else {
        let token = res.data.data[0].user_token
        sessionStorage.setItem('token', JSON.stringify(token))
        navigate('/');
        alert(res.data.msg);
      }
    }).catch((err) => {
      console.log(err)
    })
    actions.resetForm()
  }

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      user_password: '',
      user_email: ''
    },
    validationSchema: loginSchema,
    onSubmit
  });

  return (
    <div id='login'>
      <div className="container">
        <div className="col-12">
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
              } />
              {
              errors.user_email && touched.user_email &&
              <p className='error'>{errors.user_email}</p>
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
            <button disabled={isSubmitting} type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login