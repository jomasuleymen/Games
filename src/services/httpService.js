import axios from "axios";
import toast from "@utils/toast";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.baseURL = "http://127.0.0.1:3000/";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.warning(error.message);
    }

    return Promise.reject(error);
});

const setJwt = (jwt) => {
    axios.defaults.headers.common["token"] = jwt;
};

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
};
