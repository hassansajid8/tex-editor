"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormEvent } from 'react'
import { useState } from 'react'

const Register = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    
    async function handleSubmit(event){
        setIsLoading(true);
        setError(null)
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try{
            const response = await fetch('/api/register', {
                method: "POST",
                body: formData,
            })
            
            if(response.status == 200){
                router.push('/dashboard');
            }

            if(!response.ok){
                throw new Error("Account already exists, please login")
            }
    
        }catch(error){
            setError(error.message)
        }finally{
            setIsLoading(false);
        }
        


    }

  return (
    <div className='container w-2/3 mx-auto px-2 py-5 text-blue border-2 border-blue'>
        <h3 className='text-2xl text-center'>Create a new account</h3>
        <form onSubmit={handleSubmit} className='flex flex-col py-5 '>
            <input className='my-2 w-4/5 px-2 py-3 mx-auto border-2 border-blue' type='text' placeholder='Create a username' required name="username" />
            <input className='my-2 w-4/5 px-2 py-3 mx-auto border-2 border-blue' type='password' placeholder='Create a password' required name="password" />
            <button className='my-2 py-2 w-1/3 mx-auto border-2 border-blue hover:bg-blue text-xl hover:text-white' type='submit' disabled={isLoading} >
                {isLoading ? 'Loading...' : 'Register'}
            </button>
            <p className='text-red text-center'>
            {error ? error : ''}
            </p>
        </form>
    </div>
  )
}

export default Register