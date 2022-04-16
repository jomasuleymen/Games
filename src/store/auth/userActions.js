import store from "@store/store";
import toast from "@utils/toast";
import { setUser as setUserReducer, logOut as logOutReducer } from "./userSlice";

const setUser = (user) => {
    store.dispatch(setUserReducer(user));
    if (user && user.username) {
        toast.success(`Hello, ${user.username}`);
    }
};

const logOut = () => {
    store.dispatch(logOutReducer());
}

const isAuth = () => {
    return store.getState().user.isAuth;
}

export default {
    setUser,
    isAuth,
    logOut
};
