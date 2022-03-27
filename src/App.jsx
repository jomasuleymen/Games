import React from "react";
import { Provider } from "react-redux";

import Playground from "@components/sudoku";
import cellStore from "@stores/selectedCell";

import "@styles/style.scss";

function App() {
    return (
        <Provider store={cellStore}>
            <Playground />
        </Provider>
    );
}

export default App;
