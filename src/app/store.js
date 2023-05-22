import { configureStore} from '@reduxjs/toolkit'
import authReducer from '../components/features/auth/authSlice'

 const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})
export default store