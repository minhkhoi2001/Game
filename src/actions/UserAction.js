import {UserService} from "../service/index"
import BaseActions from './BaseAction'

const actionsProps = {
    service: UserService,
}
class UserAction extends BaseActions {
    Login =async (data)=>{
        try {
            debugger
            const res = await this.service.Login(data)
            if(res.status===200){
                return Promise.resolve(res)
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
const action = new UserAction(actionsProps)
export default action
