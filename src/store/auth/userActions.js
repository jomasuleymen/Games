import store from "@store/store";
import { setUser as setUserReducer } from "./userSlice";

const setUser = (user) => {
    store.dispatch(setUserReducer(user));
};

export default {
    setUser,
};
