import axios from "axios";


const axiosSocketInstance = axios.create({
    baseURL: "http://localhost:3002"
});

axiosSocketInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(token!=null) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default axiosSocketInstance;
