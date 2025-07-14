import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


interface UseChatSocketResult {
    socket: Socket | null
    connected: boolean
}

export const useChatSocket = (): UseChatSocketResult => {
    const [connected, setConnected] = useState(false)
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token) return

        const socket = io('http://localhost:3002/chat', {
            auth: { token },
            transports: ['websocket']
        })

        socket.on('connect', () => {
            setConnected(true)
            console.log(`Log socket success!`)
        })

        socket.on('disconnect', () => {
            setConnected(false)
            console.log('Log socket failed!')
        })

        socketRef.current = socket

        return () => {
            console.log("disconnecting...");
            socket.disconnect();
        };
    }, [])

    return { socket: socketRef.current, connected: connected }
}



