import { Link } from 'react-router-dom';
import './AuthPage.css';
import { useLogin } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {

 const { formData, changeHandler } = useForm({
    email: "",
    password: ""
 });

  const login  = useLogin();
  
  

  const loginHandler = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password)
      console.log("success")
    } catch (error) { 
      console.log(`Error: ${error}`)
    }
  }

  
  return (
    <div className='auth-container'>
      <div className='auth-card'>

        <div className='auth-header'>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form className='auth-form' onSubmit={loginHandler}>
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

          <button className='auth-button'>Sign In</button>
        </form>

        <div className='auth-footer'>
          <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;