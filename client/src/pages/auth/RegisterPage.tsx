import { Link, useNavigate } from 'react-router-dom';
import type { RegisterBody } from '../../types/user.types';
import { useRegister } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import './AuthPage.css';
import Navbar from '../../components/navbar/Navbar';
import { ClipLoader } from 'react-spinners';

const RegisterView = () => {

  const navigate = useNavigate();

  const initialValues = { 
    email: "",
    username: "",
    password: ""
  }

  const { register, isLoading, error} = useRegister();

  const registerHandler = async (formData: RegisterBody) => {
      try {
        await register(formData.email, formData.username, formData.password)
        navigate('/')
      } catch (err) {
        console.error(error)
      } 
  }

  const { formData , changeHandler, submitHandler } = useForm(initialValues, registerHandler)
  
 
  return (
    <>
    <Navbar />
    <div className='auth-container'>
      <div className='auth-card'>

        <div className='auth-header'>
          <h1>Create an account</h1>
          <p>Start your meal planning journey today</p>
        </div>

        <form className='auth-form' onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='johndoe'
              value={formData.username}
              onChange={changeHandler}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={changeHandler}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='••••••••'
              value={formData.password}
              onChange={changeHandler}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='••••••••'
            />
          </div>

          <button className='auth-button' type='submit' disabled={isLoading} style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}>
            {isLoading ? (
                <ClipLoader size={20} color="#eef2ff" />
                ) : 
                ('Register')}
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
              Register Failed: {error}
            </div>
          )}

        <div className='auth-footer'>
          <p>Already have an account? <Link to='/login'>Sign in</Link></p>
        </div>

      </div>
    </div>
    </>
    
  );
};

export default RegisterView;