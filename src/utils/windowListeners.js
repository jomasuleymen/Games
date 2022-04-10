const setOnkeyUp = (func) => {
    window.onkeyup = func;
    return () => {
        window.onkeyup = null;
    };
};
const setOnkeyDown = (func) => {
    window.onkeydown = func;
    return () => {
        window.onkeydown = null;
    };
};

export { setOnkeyUp, setOnkeyDown };
