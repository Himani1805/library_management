import axios from 'axios';

const apiClient = axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:10000,
    withCredentials:true,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${""}`

    }
})

export default apiClient;