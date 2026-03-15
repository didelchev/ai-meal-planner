import { Link } from 'react-router-dom';
import './AuthPage.css';
import { useState } from 'react';
import type { RegisterBody } from '../../types/user.types';
import { useRegister } from '../../hooks/useAuth';

const RegisterView = () => {

  const [authData, setAuthData ] = useState<RegisterBody>({
    email: "",
    username: "",
    password: ""
  });

  const register = useRegister();


  const registerHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await register(authData.email, authData.username, authData.password)
        console.log("Success")
      } catch (error) {
        console.log(error)
      }

  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({...authData, [e.target.name]: e.target.value})
  }

  
  return (
    <div className='auth-container'>
      <div className='auth-card'>

        <div className='auth-header'>
          <h1>Create an account</h1>
          <p>Start your meal planning journey today</p>
        </div>

        <form className='auth-form' onSubmit={registerHandler}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='johndoe'
              value={authData.username}
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
              value={authData.email}
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
              value={authData.password}
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

          <button className='auth-button'>Create Account</button>
        </form>

        <div className='auth-footer'>
          <p>Already have an account? <Link to='/login'>Sign in</Link></p>
        </div>

      </div>
    </div>
  );
};

export default RegisterView;