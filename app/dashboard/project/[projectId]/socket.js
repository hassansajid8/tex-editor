"use client"
import { io } from "socket.io-client"

const BACKEND_URL = "https://tex-editor-socket.onrender.com/"

export const socket = io(BACKEND_URL);