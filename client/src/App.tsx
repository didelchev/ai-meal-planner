import { useEffect } from 'react';
import './App.css'
import { authAPI } from './api/authApi';

function App() {


useEffect(() => {
  const loginUser = async () => {

    const userData = await authAPI.login('johndoe@gmail.com', '123456')

    console.log(userData)
  }

  loginUser();

},[])




  return (
    <>
    <h1>My App</h1>
    </>
  )

}

export default App
