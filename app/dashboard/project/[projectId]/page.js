"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { socket } from "./socket";
import { useParams } from "next/navigation";

export default function Project() {
  const params = useParams();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [project, setProject] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null)
  const [username, setUsername] = useState(null)
  const [title, setTitle] = useState(null)
  const [msg, setMsg] = useState(null)

  function handleChange(event) {
    let editor = document.getElementById("editor");
    socket.emit("document changed", editor.value, params.projectId);
  }

  /*   function emitCaretPosition(event){
      let editor = document.getElementById("editor");
      if(editor.selectionStart != editor.selectionEnd){
        console.log(editor.selectionStart + " to " + editor.selectionEnd)
        socket.emit('caret selected', editor.selectionStart, editor.selectionEnd)
      }
      else{
        console.log(editor.selectionStart);
        socket.emit('caret position', editor.selectionStart)
      }
  
    } */

  function updateTitle(event) {
    socket.emit("title update", document.getElementById('title').value, params.projectId)
  }

  useEffect(() => {

    async function fetchProject() {
      const formData = new FormData();
      formData.append('projectId', params.projectId)
      const response = await fetch('/api/fetch-this-project', {
        method: "POST",
        body: formData
      })
      const fetchedProject = JSON.parse(await response.json())
      setProject(fetchedProject)
      setTitle(fetchedProject.title)
    }

    fetchProject();
    const getUsername = document?.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
    setUsername(getUsername)
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("join", params.projectId, getUsername);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.on("broadcast change", (changeValue) => {
      document.getElementById('editor').value = changeValue;
    })

    socket.on("join success", () => {
      console.log(" connected to room");
    })

    socket.on("update users list", (clients) => {
      console.log(clients.map((clients) => clients.username))
      setActiveUsers(clients)
    })

    socket.on("new title", (value) => {
      console.log("new title " + value)
      setTitle(value)
      setMsg('Title Updated')
      setTimeout(() => {
        setMsg(null)
      }, 3000)
    })

    socket.on("user disconnected", (someUser) => {
      console.log(someUser + " disconnected")
      setActiveUsers((prev) => {
        return prev.filter((activeUser) => activeUser.username != someUser)
      })

      setMsg(String(someUser + ' left'))
      setTimeout(() => {
        setMsg(null)
      }, 3000)
      
    })
  }, [])

  return (
    <div className="w-4/5 px-2 py-2 overflow-y-clip max-h-screen">
      <div className="flex justify-between items-baseline mb-5">
        <div className="">
          <input className="border border-grey focus:border-blue p-2" id="title" type="text" name="title" defaultValue={title ? title : 'loading...'} disabled={!title || !isConnected}></input>
          <button onClick={updateTitle} className="w-min px-2 border border-grey hover:underline mt-3 ml-2 text-xs">Rename</button>
        </div>
        <p className="text-green">{msg ? msg : ''}</p>
        <p className={isConnected ? 'text-green' : 'text-red'}>status: {isConnected ? "connected" : "disconnected"}</p>
      </div>
      <textarea id="editor" className="mx-auto p-2" onKeyUp={handleChange} defaultValue={project ? project.body : ''} disabled={!project || !isConnected}>
      </textarea>
      <div className="h-dvh border p-2">
        <p className="text-md text-blue">Joined users</p>
        <div>
          {activeUsers?.map((user) => <p className="m-2 border border-grey w-32 px-2 py-1 flex justify-between items-center">{user.username}<i className="iconoir-circle text-xs text-green"></i></p>)}
        </div>
      </div>
    </div>
  );
}