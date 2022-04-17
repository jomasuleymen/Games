import http from "./httpService";
import userActions from "@store/auth/userActions";

const userApi = "users/";

const registerUser = (data) => {
    return http.post(userApi + "register", data);
};

const setUser = (user, token) => {
    userActions.setUser(user);
    localStorage.setItem("x-auth-token", token);
    http.setJwt(token);
};

const loginUser = (data) => {
    return http.post(userApi + "login", data).then((res) => {
        setUser(res.data.user, res.headers["x-auth-token"]);
    });
};

const setCurrentUser = async () => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) return;

    http.setJwt(token);

    http.get(userApi + "auth")
        .then((res) => {
            setUser(res.data.user, res.headers["x-auth-token"]);
        })
        .catch((err) => {
            localStorage.removeItem("x-auth-token");
            http.setJwt(null);
        });
};

const logout = () => {
    http.setJwt(null);
    localStorage.removeItem("x-auth-token");
    userActions.logOut();
};

export default {
    setCurrentUser,
    registerUser,
    loginUser,
    logout,
};
