import http from "./httpService";
import userActions from "@store/auth/userActions";

const userApi = "users/";

const registerUser = (data) => {
    return http.post(userApi + "register", data);
};

const loginUser = async (data) => {
    return http.post(userApi + "login", data).then((res) => {
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

    http.post(userApi + "me", { token })
        .then(({ data: user }) => {
            userActions.setUser(user);
            http.setJwt(token);
        })
        .catch(() => {
            localStorage.removeItem("x-auth-token");
        });
};

const logout = () => {
    localStorage.removeItem("x-auth-token");
    userActions.setUser(null);
    http.setJwt(null);
};

export default {
    setCurrentUser,
    registerUser,
    loginUser,
    logout,
};
