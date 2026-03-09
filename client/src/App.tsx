import { useEffect } from 'react';
import './App.css'
import { API } from './utils/fetcher'

function App() {
const BASE_URL = "http://localhost:5000"


useEffect(() => {

  const getData = async() => {
    const res = await API.get(BASE_URL);

    console.log(res)
  }

  getData()

},[])




  return (
    <>
    <h1>My App</h1>
    </>
  )

}

export default App
