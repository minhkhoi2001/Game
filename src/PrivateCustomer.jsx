import { Outlet, Navigate } from "react-router";
import { LoginStatus } from "./hook/checkLg";
import axios from "axios";
import { useEffect, useState } from "react";
const PrivateCustomer=()=>{
    const [checking, setChecking] =useState(true)
    const [isCustomer,setisCustomer] = useState(null)
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
			.get(`https://server.best96tx.com/auth/getUser`,{
			})
			.then((res) => {
					setChecking(false)
                   if(res.data.data.isCustomer== true){
					setisCustomer(res.data.data.isCustomer)
				   }
			}).catch(res=>setChecking(false))
	},[])

    if(checking){
        return(
            <>
            <div></div>
            </>
        )
    }
    return isCustomer?<Outlet/> :<Navigate to ='/login'/>
   
}
export default PrivateCustomer;