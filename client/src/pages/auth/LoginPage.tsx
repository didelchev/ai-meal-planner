import { Link } from 'react-router-dom';
import './AuthPage.css';

const LoginPage = () => {
  return (
    <div className='auth-container'>
      <div className='auth-card'>

        <div className='auth-header'>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <div className='auth-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='you@example.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
            />
          </div>

          <button className='auth-button'>Sign In</button>
        </div>

        <div className='auth-footer'>
          <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;