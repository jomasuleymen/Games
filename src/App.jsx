import React from 'react'
import Wrapper from './Components/Sudoku/index'
import { store } from "./Components/Sudoku/gameData";
import { Provider } from 'react-redux';

function App(){
    return (
        <Provider store={store}>
            <Wrapper />
        </Provider>
    )
};

export default App;