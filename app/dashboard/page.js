'use client'

import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import Logout from '../components/Logout'
import { useState } from 'react'
import JSONBig from 'json-bigint'
import Iconoir from 'iconoir/icons/iconoir.svg';


const Dashboard = () => {
  const [username, setUsername] = useState(null)
/*   const [projects, setProjects] = useState(null) */
  const [allProjects, setAllProjects] = useState(null)
  const [deleted, setDeleted] = useState(null)

  useEffect(async () => {
    let getUsername = document?.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
    setUsername(getUsername)
    /* fetchProjects(); */
    fetchAllProjects();
  }, [])


  /* async function fetchProjects(){
    const response = await fetch('/api/fetch-projects', {
      mathod: "GET",
    })

    if(response){
      const fetchedProjects = JSON.parse(await response.json());
      setProjects(fetchedProjects);
      console.log(projects)
    }
  }
 */
  async function fetchAllProjects(){
    const response = await fetch('/api/fetch-all', {
      method: "GET"
    })

    if(response){
      const fetchedProjects = JSONBig.parse(await response.json())
      setAllProjects(fetchedProjects)
    }
  }

  async function deleteProject(projectId, event){
    const formData = new FormData();
    formData.append("projectId", projectId)

    const response = await fetch('/api/delete-project', {
      method: "POST",
      body: formData,
    })

    let deleted = JSONBig.parse(await response.json())
    setDeleted(deleted);
    fetchAllProjects();
    setTimeout(() => {setDeleted(null)}, 3000)
  }
  
  return (
    <div className='px-5 py-5 w-4/5' >
      <div>
        <p className='text-3xl h-8 mb-10'>{username ? ('Welcome ' + username) : '...'} </p>
      </div>

      {/* <div className='border-2 border-blue h-2/6 py-2 px-2 my-5'>
        <p className='text-md'><u>Your projects</u></p>
        <div className='mt-5 flex flex-col'>
        {projects ? projects.map((project)=>{
          return (
            <a href={'dashboard/project/' + project.id} className='text-blue hover:underline'>
            <tr>
              <td className='w-3xl'>{project.title}</td>
              <td className='w-3xl'>{project.createdAt}</td>
            </tr>
            </a>
          )
        }) : 'No projects...'}
        </div>
      </div> */}

      <div className='border-2 border-blue h-2/6 py-2 px-2 my-5 overflow-y-scroll'>
        <p className='text-md'><u>All projects</u></p>
        <div className='mt-5 flex flex-col'>
        {allProjects ? allProjects.map((project)=>{
          return (
            <tr className='pr-10 px-2 flex justify-between text-blue hover:underline hover:bg-dblue hover:text-white'>
              <a href={'dashboard/project/' + project.id} className='flex justify-between w-2/3'>
              <td className='w-64'>{project.title}</td>
              <td className='w-1/2 text-left'>Created by: {project.createdBy}</td>
              </a>
              <button className='hover:pointer' w='16 ml-20' onClick={(e) => {deleteProject(project.id, e)}}><i className='iconoir-bin hover:text-red'></i></button>
            </tr>
          )
        }) : 'No projects...'} 
        </div>
      </div>
      <p className='text-red mx-auto'>{deleted ? ('Deleted project: ' + deleted.title) : ''}</p>

    </div>
  )
}

export default Dashboard