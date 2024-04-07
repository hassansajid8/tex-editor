"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { FormEvent } from 'react'

const Logout = () => {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('logout', true);

        const response = await fetch('/api/logout', {
            method: "POST",
            body: formData,
        })

        if(response){
            router.push('/');
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <button className='my-2 py-2 px-3 mx-auto border-2 border-blue hover:bg-blue hover:text-white' type='submit'>
                Logout
            </button>
        </form>
    </div>
  )
}

export default Logout