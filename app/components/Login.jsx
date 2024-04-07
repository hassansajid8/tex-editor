"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormEvent } from 'react'
import { useState } from 'react'

const Login = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    
    async function handleSubmit(event){
        setIsLoading(true);
        setError(null)
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        console.log(formData.get('email'));

        try{
            const response = await fetch('/api/login', {
                method: "POST",
                body: formData,
            })
            
            if(response.status == 200){
                router.push('/dashboard');
            }

            if(!response.ok){
                if(response.status == 401){
                    throw new Error('Invalid credentials')
                }
                else if(response.status == 500){
                    throw new Error('Something went wrong, please try again')
                }
            }
    
        }catch(error){
            setError(error.message)
        }finally{
            setIsLoading(false);
        }
        


    }

  return (
    <div className='container w-2/3 mx-auto px-2 py-5 text-blue border-2 border-blue'>
        <h3 className='text-2xl text-center'>Sign-in to your account</h3>
        <form onSubmit={handleSubmit} className='flex flex-col py-5 '>
            <input className='my-2 w-4/5 px-2 py-3 mx-auto border-2 border-blue focus:border-blue' type='text' placeholder='Enter username...' required name="username" />
            <input className='my-2 w-4/5 px-2 py-3 mx-auto border-2 border-blue' type='password' placeholder='Enter password' required name="password" />
            <button className='my-2 py-2 w-1/3 mx-auto border-2 border-blue hover:bg-blue text-xl hover:text-white' type='submit' disabled={isLoading} >
                {isLoading ? 'Loading...' : 'Login'}
            </button>
            <p>
            {error ? error : ''}
            </p>
        </form>
    </div>
  )
}

export default Login