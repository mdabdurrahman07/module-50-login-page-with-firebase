import React, { useState } from 'react';
import { AiFillEye , AiFillEyeInvisible } from "react-icons/ai";
import {  createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import auth from '../../firebase/firebase.config';
const Register = () => {
  const [RegError , SetRegError] = useState('')
  const [RegSuccess, SetRegSuccess] = useState('')
  const [showpassword , setshowpassword] = useState(false)
    const handlefrom= e => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const term = e.target.terms.checked
    console.log(email , password , name, term)
    if(password.length < 6 ){
      SetRegError("Password should be atleast 6 characters or longer")
      return
    }
    else if (!/[A-Z]/.test(password)){
      SetRegError("Password should be atleast one upper case character")
      return
    }
    else if(!term){
      SetRegError('Please, Accept Our Terms & Conditions')
      return
    }

    SetRegSuccess('')
      SetRegError('')
    // creating new user
    createUserWithEmailAndPassword(auth , email , password)
    .then(result => {
      console.log(result.user)
      // verified Email
     sendEmailVerification(result.user)
      SetRegSuccess('User Created Successfully')
     
      
    })
    
    .catch(error =>{
      console.log(error)
      SetRegError(error.message)
    })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Register</h1>
      <p className="py-6"></p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
     <form onSubmit={handlefrom}>
     <div className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' required placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' required placeholder="email" className="input input-bordered" />
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
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <input type="checkbox" name='terms' /> <p>Accept Our Terms & Conditions</p>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
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

export default Register;