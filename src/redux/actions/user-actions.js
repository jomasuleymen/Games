import { SET_USER } from "@types/user";
import stores from "@stores/stores";

const setUser = (user) => {
    stores.dispatch({
        type: SET_USER,
        payload: user,
    });
};

export default {
    setUser,
};
