import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { useLogin } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import type { LoginBody } from '../../types/user.types';
import Navbar from '../../components/navbar/Navbar';
import { ClipLoader } from 'react-spinners';

const LoginPage = () => {

  const {login, isLoading, error}  = useLogin();
  const initialValues = { email: "", password: ""}
  const navigate  = useNavigate();

  const loginHandler = async (formData: LoginBody) => {
    try {
      await login(formData.email, formData.password)
      navigate("/")
    } catch (err) { 
      console.error(error)
    } 
  }

  const { formData, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

  
  return (
    <>
      <Navbar/>
      <div className='auth-container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form className='auth-form' onSubmit={submitHandler}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={changeHandler}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={changeHandler}
              />
            </div>

            <button className='auth-button'>
              {isLoading ? (
                <ClipLoader size={20} color="#eef2ff" />
                ) : 
                ('Sign in')}
            </button>
          </form>
          {error && (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Login Failed: {error}
            </div>
          )}

          <div className='auth-footer'>
            <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  )
};


export default LoginPage