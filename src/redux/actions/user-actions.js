import store from "@store";
import { setUser as setUserReducer } from "@reducers/userReducer";

const setUser = (user) => {
    store.dispatch(setUserReducer(user));
};

export default {
    setUser,
};
