import { SET_USER } from "@types/user";

const currentUser = null;

export default function cellReducer(user = currentUser, action) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return user;
    }
}
