import { Link } from 'react-router-dom';
import type { RegisterBody } from '../../types/user.types';
import { useRegister } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import './AuthPage.css';
import Navbar from '../../components/navbar/Navbar';

const RegisterView = () => {

  const initialValues = { 
    email: "",
    username: "",
    password: ""
  }

  const register = useRegister();

  const registerHandler = async (formData: RegisterBody) => {
      try {
        await register(formData.email, formData.username, formData.password)
        console.log("Success")
      } catch (error) {
        console.log(error)
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

          <button className='auth-button'>Create Account</button>
        </form>

        <div className='auth-footer'>
          <p>Already have an account? <Link to='/login'>Sign in</Link></p>
        </div>

      </div>
    </div>
    </>
    
  );
};

export default RegisterView;