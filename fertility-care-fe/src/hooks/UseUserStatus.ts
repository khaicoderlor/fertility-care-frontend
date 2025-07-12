import { useEffect, useState } from "react"
import axiosSocketInstance from "../apis/AxiosSocketInstance"

export const useUserStats = (userId: string) => {
    const [online, setOnline] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(!token) return

        const fetchOnlineUser = async () => {
            try {
                const response = await axiosSocketInstance.post('/getOnlineStatus');
                setOnline(response.data)
            } catch(error) {
                console.log(error)
            }
        } 
        fetchOnlineUser()

        const interval = setInterval(fetchOnlineUser, 10000)
        return () => clearInterval(interval)
    }, [userId])

    return {online: online}
}














