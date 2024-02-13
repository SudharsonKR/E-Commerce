import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../slices/authSlice';
import { StyledForm } from './StyledForm';

const Register = () => {

const dispatch = useDispatch()
const navigate = useNavigate();
const auth = useSelector((state)=>state.auth)

console.log(auth) 

useEffect(()=>{
  if(auth._id){
    navigate('/cart')
  }
},[auth._id, navigate])

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("user Details checking:", user)
    dispatch(registerUser(user))
    
  }

  

  return (
    <>
    <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder='Enter Name' onChange={(e)=> setUser({...user, name: e.target.value})}/>
        <input type="email" placeholder='Enter Email'onChange={(e)=> setUser({...user, email: e.target.value})}/>
        <input type="password" placeholder='Enter Password'onChange={(e)=> setUser({...user, password: e.target.value})}/>
        <button>{auth.registerStatus === 'pending' ? "Submitting..." : "Register"}</button>
        {auth.registerStatus === 'rejected' ? (<p>{auth.registerError}</p>) : null}
    </StyledForm>
    </>
  )
}

export default Register