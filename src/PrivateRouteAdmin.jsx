import { Outlet, Navigate } from "react-router";
import { LoginStatus } from "./hook/checkLg";
import axios from "axios";
import { useEffect, useState } from "react";
const PrivateRouteAdmin=()=>{
    const [checking, setChecking] =useState(true)
    const [isAdmin,setIsAdmin] = useState(null)
	axios.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('user');
	
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`;
			}
	
			return config;
		},
	
		(error) => {
			return Promise.reject(error);
		}
	);
	useEffect(()=>{
		axios
			.get(`https://server.luckkylotte9d.com/auth/getUser`,{
			})
			.then((res) => {
					setChecking(false)
                    setIsAdmin(res.data.data.isAdmin)
			}).catch(res=>setChecking(false))
	},[])

    if(checking){
        return(
            <>
            <div></div>
            </>
        )
    }
    return isAdmin?<Outlet/> :<Navigate to ='/login'/>
   
}
export default PrivateRouteAdmin;