import http from "./httpService";
import userActions from "@store/auth/userActions";

const apiEndpoint = "users/";

const registerUser = (data) => {
    return http.post(apiEndpoint + "register", data);
};

const loginUser = async (data) => {
    return http.post(apiEndpoint + "login", data).then((res) => {
        const user = res.data;
        userActions.setUser(user);

        const token = res.headers["x-auth-token"]; /* refactor -> separate */
        localStorage.setItem("x-auth-token", token);
        http.setJwt(token);
    });
};

const setCurrentUser = async () => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) return;

    http.setJwt(token);
    http.get(apiEndpoint + "me")
        .then(({ data: user }) => {
            userActions.setUser(user);
        })
        .catch((error) => {
            localStorage.removeItem("x-auth-token");
            http.setJwt(null);
        });
};

const logout = () => {
    localStorage.removeItem("x-auth-token");
    userActions.setUser(null);
    http.setJwt(null);
    location.reload();
};

export default {
    setCurrentUser,
    registerUser,
    loginUser,
    logout,
};
