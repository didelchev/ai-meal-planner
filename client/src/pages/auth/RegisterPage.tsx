import { Link } from 'react-router-dom';
import './AuthPage.css';

const RegisterView = () => {
  return (
    <div className='auth-container'>
      <div className='auth-card'>

        <div className='auth-header'>
          <h1>Create an account</h1>
          <p>Start your meal planning journey today</p>
        </div>

        <div className='auth-form'>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              placeholder='johndoe'
            />
          </div>

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

          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              placeholder='••••••••'
            />
          </div>

          <button className='auth-button'>Create Account</button>
        </div>

        <div className='auth-footer'>
          <p>Already have an account? <Link to='/login'>Sign in</Link></p>
        </div>

      </div>
    </div>
  );
};

export default RegisterView;