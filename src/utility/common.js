import { ERROR_MESSAGE_400, ERROR_MESSAGE_401, ERROR_MESSAGE_404, ERROR_MESSAGE_500 } from "../constants/message";

export const handleErrorResponse = function (error) {
    let response = error.response;
    if (response) {
        let status = response.status;
        if (status === 400) {
            if (Array.isArray(response.data)) {
                response.data.forEach(function (errObject) {
                    if (errObject.detail) {
                        console.log(errObject.detail);
                    }
                });
            } else if (response.data.detail) {
                console.log(response.data.detail);
            } else {
                console.log(ERROR_MESSAGE_400);
            }
        } else if (status === 404) {
            if (response.data.detail) {
                console.log(response.data.detail);
            } else {
                console.log(ERROR_MESSAGE_404);
            }
        } else if (status === 500) {
            console.log(ERROR_MESSAGE_500);
        } else if (status === 401) {
            if (response.data.detail) {
                console.log(response.data.detail);
            } else {
                console.log(ERROR_MESSAGE_401);
            }
        } else if (status === 403) {
            console.log(ERROR_MESSAGE_401);
        }
    } else {
        // console.log(ERROR_INTERNET_CONNECTIVITY);
    }
};