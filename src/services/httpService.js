import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.baseURL = "https://boring-games-777.herokuapp.com/";

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
