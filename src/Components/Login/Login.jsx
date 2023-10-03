import React, { useRef, useState } from 'react';
import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
import {  signInWithEmailAndPassword , sendPasswordResetEmail} from "firebase/auth";
import auth from '../../firebase/firebase.config';

const Login = () => {
    const emailRef = useRef(null)
    const [RegError , SetRegError] = useState('')
  const [RegSuccess, SetRegSuccess] = useState('')
  const [showpassword , setshowpassword] = useState(false)
    const handlefrom= e => {
    e.preventDefault()
   
    const email = e.target.email.value
    const password = e.target.password.value
   
    console.log(email , password )
    if(password.length < 6 ){
      SetRegError("Password should be atleast 6 characters or longer")
      return
    }
    else if (!/[A-Z]/.test(password)){
      SetRegError("Password should be atleast one upper case character")
      return
    }
   

    SetRegSuccess('')
      SetRegError('')
    // creating new user
    signInWithEmailAndPassword(auth , email , password)
    .then(result => {
      console.log(result.user)
      if(result.user.emailVerified){
        SetRegSuccess('User has Logged Successfully')
       }
       else{
        alert("Please Verify Your Email")
       }
    })
    .catch(error =>{
      console.log(error)
      SetRegError(error.message)
    })
    }
    const handleforgetpassoword = () =>{
        const emailForget = emailRef.current.value
        if(!emailForget){
            alert('enter your email') 
            return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailForget)){
            alert('please, Provide a valid email')
            return
        }
        sendPasswordResetEmail(auth , emailForget)
        .then(()=>{
            alert("Please check your email, an email has send to reset your password")
        })
        .catch(error => {
            console.log(error)
            SetRegError(error.message)
        }
            )

        
    }
    return (
        <div>
                        <div className="hero min-h-screen bg-base-200">
  <div className="">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Log In</h1>
      <p className="py-6"></p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
     <form onSubmit={handlefrom}>
     <div className="card-body">
     
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"
           name='email'
           ref={emailRef}
            required placeholder="email"
             className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>    
          </label>
         <div className='relative'>
         <input type={ showpassword ? "text" : "password"}
           name='password'
            required
             placeholder="password"
              className="input input-bordered w-full" />
          <span className='absolute right-5 top-4' onClick={()=> setshowpassword(!showpassword)}>
            {showpassword ? <AiFillEye className='text-lg'/> : <AiFillEyeInvisible className='text-lg'/>}
          </span>
         </div>
          <label className="label">
            <a href="#" onClick={handleforgetpassoword} className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        
        <div className="form-control mt-6">
          <button className="btn btn-primary">Log In</button>
        </div>
        {
          RegError && <p className='text-red-600 font-medium'>{RegError}</p>
        }
        {
          RegSuccess && <p className='text-green-600 font-medium'>{RegSuccess}</p>
        }
      </div>
     </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;