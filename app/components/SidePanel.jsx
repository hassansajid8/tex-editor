'use client'

import React from 'react'
import Logout from './Logout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SidePanel = () => {
    const router = useRouter()

    const [responseMsg, setResponseMsg] = useState(null);

    async function createProject(event){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try{
            const response = await fetch('/api/createProject', {
                method: "POST",
                body: formData,
            })
    
            if(response.status == 200){
                console.log('created');
                let project = JSON.parse(await response.json())
                router.push(('/dashboard/project/' + project.id))
            }

            if(!response.ok){
                throw new Error("Error creating project")
            }
        }catch(error){
            console.log('error creating')
            setResponseMsg(error.message);
        }

        

        setTimeout(()=>{
            setResponseMsg(null)
        }, 2000)
    }

  return (
    <div className='container w-1/5 h-screen px-5 py-1 border-r border-blue min-w-80'>
        <div className="w-min my-5 italic mb-10 text-blue flex items-baseline md:text-3xl text-2xl">
            <h1 className="font-black">TEX</h1>
            <h1 className="">EDITOR</h1>
        </div>
            
        <a href='/' className='text-white text-xl'>
        <div className='bg-blue hover:bg-dblue px-2 py-2 mb-10'>
            Dashboard
        </div></a>

        <div className='w-full border-2 border-blue py-2 px-2 my-5 text-sm '>
            <h2 className='mb-3'>Create new project</h2>
            <form className='flex flex-col' onSubmit={createProject}>
                <input className='border-2 border-blue focus:border-blue p-2' type='text' name='title' placeholder='Enter title...'></input>
                <button className='w-min px-2 border-2 border-blue hover:bg-blue hover:text-white mt-3' type='submit'>Create</button>
                <p className='text-sm text-green mx-2'>
                    {responseMsg ? responseMsg : ''}
                </p>
            </form>
        </div>
            <div className='bg-note w-full my-40 text-black text-xl font-bold p-5 text-center'>
                <p className='flex items-center'><i className='iconoir-warning-circle mr-2'></i>App in development</p>
                <p>More features are coming!</p>
            </div>

        <div className='fixed bottom-5'>
        <Logout />
        </div>

    </div>
  )
}

export default SidePanel