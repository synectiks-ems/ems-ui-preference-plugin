import { any } from "prop-types";

const preferenceUrl = 'http://localhost:9091';
export const services = {
    getAuthorizedSignatoryList
};

function getRequestOptions(type: any, body: any) {
    let requestOptions: any = {
        method: type
    };
    if (body) {
        requestOptions['body'] = body;
    }
    return requestOptions;
}

function getAuthorizedSignatoryList(){
    let url = preferenceUrl + '/api/authorized-signatory-by-filters';
    const requestOptions = getRequestOptions("GET", null);
    return fetch(`${url}`, requestOptions).then(response => response.json());
}

