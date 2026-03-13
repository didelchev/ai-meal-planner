import React, { useEffect } from 'react'
import { authAPI } from '../../api/authApi'

const HomePage = () => {

  useEffect(() =>  {
    const loginUser = async ( ) => {
      const user = await authAPI.register("johndoe@gmail.com", 'john.doe', '123456')

      console.log(user)
    }

    loginUser()
  },[])



  return (
    <div>HomePage</div>
  )
}

export default HomePage