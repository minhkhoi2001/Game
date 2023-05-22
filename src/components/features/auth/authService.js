import axios from 'axios'
const API_URL ='/auth'

const adminUpdate =async(data)=>{
    const response = await axios.post(`${API_URL}/adminUpdateProfile `, data)
    return response.data
}
const login = async (userData) => {
    
    const response = await axios.post(`${API_URL}/login `, userData)
    if(response.data){
        localStorage.setItem('hsthuyhoang',JSON.stringify(response.data))
    }
    return response.data
    
}
const getUser = async (token) => {
    const config = {headers:{
        Authorization: `Bearer ${token}`,
    }}
    
    const response = await axios.get(`${API_URL}/getAuth `, config)
    return response.data
    
}

const logout = () => localStorage.removeItem('hsthuyhoang')


const authService = {
    logout,
    login,
    getUser,

}
export default authService