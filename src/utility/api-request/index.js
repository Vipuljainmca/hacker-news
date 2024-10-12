import axios from "axios";
import { handleErrorResponse } from "../common";

export const getAPI = async function (URL, successFn, errorFn, params = {}) {
    axios({
        method: "get",
        url: URL,
        params: params,
    })
        .then(function (response) {
            let data = response?.data;
            successFn(data);
        })
        .catch(function (error) {
            handleErrorResponse(error);
            errorFn(error);
        });
};
