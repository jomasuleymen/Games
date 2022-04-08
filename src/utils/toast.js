import { toast } from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    pauseOnFocusLoss: false,
};

const error = (text) => {
    toast.error(text, options);
};
const warning = (text) => {
    toast.warn(text, options);
};
const success = (text) => {
    toast.success(text, options);
};
const info = (text) => {
    toast.info(text, options);
};

export default {
    error,
    warning,
    success,
    info,
};
