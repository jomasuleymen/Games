import store from "@store/store";
import { setUser as setUserReducer } from "./userSlice";
import toast from "@utils/toast";

const setUser = (user) => {
    store.dispatch(setUserReducer(user));
    if (user && user.username) {
        toast.success(`Hello, ${user.username}`);
    }
};

const isAuth = () => {
    return store.getState().user !== null;
}

export default {
    setUser,
    isAuth
};
