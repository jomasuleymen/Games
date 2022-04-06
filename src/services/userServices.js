import http from "./httpService";
import config from "@src/config.json";
import userActions from "@actions/user-actions";

const apiEndpoint = config.apiEndpoint + "users/";

const registerUser = (data) => {
    return http.post(apiEndpoint + "register", data);
};

const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem("x-auth-token");
        if (!token) return null;

        const response = await http.post(apiEndpoint + "me", { token });
        return response.data;
    } catch (err) {
        logout();
    }
    return null;
};

const loginUser = (data) => {
    return http.post(apiEndpoint + "login", data);
};

const logout = () => {
    userActions.setUser(null);
    localStorage.removeItem("x-auth-token");
    http.setJwt(null);
};

export default {
    getCurrentUser,
    registerUser,
    loginUser,
    logout,
};
