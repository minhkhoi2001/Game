import Configuration from "../configService/configService"

import axios from "axios"

class BaseService {
    constructor(props){
        this.config = Configuration;
        this.endpoint = props.endpoint;
        this.serviceUrl= `http://localhost/${this.endpoint}`

    } 
    handleResponse(response) {
        if (response.status === 401) {
           return {
            status: 400,
            message: "Có lỗi xảy ra"
           }
        }
        return response;
    }

    handleError(errorEncode) {
        let error = { ...errorEncode }
        switch (true) {
            case error.response !== undefined && error.response !== null:
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // error = {...error.response, message: error.response.data ?? "Error"};
                // throw new Error(error.response.status + " - " + error.response.data);
                error = {
                    status: error.response.status,
                    message: error.response.data ?? "HTTP error"
                };
                break;
            case error.request !== undefined && error.request !== null:
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                error = {
                    status: error.request.status,
                    message: error.request.data ?? "HTTP error"
                };
                break;
            case error.message?.length > 0:
                error = {
                    status: error.status ?? 400,
                    message: error.message
                };
                break;
            default:
                // Something happened in setting up the request that triggered an Error
                error = {
                    status: 400,
                    message: "HTTP error"
                };
                break;
        }

        // if (error.status === 401) {
        //     AuthenticateActions.RemoveAuth()
        //     return AuthenticateActions.redirectToSSO()
        // }

        if (error.message?.startsWith?.("#")) {
            const idx = error.message.indexOf("-")
            if (idx !== -1) error.message = error.message.slice(idx + 1, error.message.length)
        } else if (error.message?.startsWith?.("<!DOCTYPE html>")) {
            error.message = "HTTP error"
        }
        return error
    } 
}

export default BaseService;