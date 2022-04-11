import { useEffect } from "react";

function useKeyUpDown(onkeyup, onkeydown) {
    useEffect(() => {
        window.onkeyup = onkeyup;
        window.onkeydown = onkeydown;
        
        return () => {
            window.onkeyup = null;
            window.onkeydown = null;
        };
    }, []);
}

export default useKeyUpDown;
