export const BASE_URL = "/"; // "http://127.0.0.1:8000/";
export const TOKEN = null; // "Bearer 1|gyrYb5WFJUAKaxzMTyfpAlrSYNLp8w8hOZVOxBPj";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const getHeader = () => {
    const headers = {
        'Accept': "application/json",
    };

    TOKEN && (headers['Authorization'] = TOKEN);
    !TOKEN && (headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN'));

    return headers;
}
const sendRequest =  (url = BASE_URL, method = "GET", data = null, api = true)=>{
    var body = {};
    if (data && method !== 'GET'){
        body["body"] = data;
    }

    body["headers"] = getHeader();
    body["method"] = method;
    
    if (!url.match(/^https?:/s)){
        url = api ? BASE_URL + "api/" + url :  BASE_URL + url;
    }

    return fetch(url, body);
}

export const processRequest = (url = BASE_URL, form, progressEvent, onDone, onError)=>{
    if (!url.match(/^https?:/s)){
        url = BASE_URL + "api/" + url;
    }

    const ajax = new XMLHttpRequest();
    
    ajax.upload.addEventListener('progress', progressEvent, false);

    ajax.addEventListener("load", (e) => {
        if (e.target.status === 201) {
            return onDone(JSON.parse(e.target.response));
        }
        return onError(JSON.parse(e.target.response)?.message, true);
    }, false);

    ajax.addEventListener("error", (e) => onError(e.target.statusText), false);
    ajax.addEventListener("abort", (e) => onDone(null), false);

    ajax.open('POST', url);


    !TOKEN && ajax.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    TOKEN && ajax.setRequestHeader('Authorization', TOKEN);
    ajax.setRequestHeader('Accept', 'application/json');
    !TOKEN && (ajax.withCredentials = true);

    ajax.send(form);
    
    return ajax;
}

export default sendRequest;