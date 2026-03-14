import React, { useEffect } from 'react'
import { authAPI } from '../../api/authApi'
import { useAuthContext } from '../../contexts/AuthContext'

const HomePage = () => {

  const { saveSession } = useAuthContext()

  useEffect(() =>  {
      const handleLogin = async () => {
        const response = await authAPI.login('johndoe@gmail.com', '123456')

        console.log(response)

        saveSession(response)

      }

      handleLogin()

  },[])



  return (
    <div>HomePage</div>
  )
}

export default HomePage