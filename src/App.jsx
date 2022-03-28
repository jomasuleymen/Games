import React from "react";
import { Provider } from "react-redux";

import Playground from "@components/sudoku";
import store from "@stores/stores";

import "@styles/style.scss";

function App() {
    return (
        <Provider store={store}>
            <Playground />
        </Provider>
    );
}

export default App;
