'use client'

import Image from "next/image";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

export default function Home() {
  const [isRegister, setIsRegister] = useState(false); 

  function toggleLoginRegister(){
    if(isRegister){
      setIsRegister(false)
    }
    else{
      setIsRegister(true)
    }
  }

  return (
    <main className="md:flex container mx-auto px-18 py-10 font-sans h-screen">
      <div id="intro" className="container md:w-1/2 py-5 text-white bg-dblue">
        <div className="text-left mx-auto container w-2/3">
        <div className="w-min my-5 italic mb-5 mt-20 flex items-baseline mx-auto md:text-5xl text-3xl">
            <h1 className="font-black">TEX</h1>
            <h1 className="">EDITOR</h1>
        </div>
          <p className="w-3/4 mx-auto text-center">A simple web-based collaborative text editor</p>
        </div>
        <div>

        </div>
      </div>
      <div className="container md:w-1/2 text-blue">
        {isRegister ? <div className="container flex flex-col"><Register /><button className="my-5 w-fit mx-auto" onClick={toggleLoginRegister}>Login to existing account</button></div> : <div className="container flex flex-col"><Login /><button className="my-5 w-fit mx-auto" onClick={toggleLoginRegister}>Create a new account</button></div>}     
      </div>

    </main>
  );
}
