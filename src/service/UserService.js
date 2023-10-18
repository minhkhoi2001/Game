import BaseService from "./BaseService";
import axios from "axios";

class UserSerivce extends BaseService {
    async Login(data) {
        return axios.post(`${this.serviceUrl}/login`, data).then(this.handleResponse).catch(this.handleError);
    }
}

const service = new UserSerivce({
    endpoint: "auth"
});
export default service;
