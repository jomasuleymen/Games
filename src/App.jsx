import React from 'react'
import Wrapper from './Components/Sudoku/index'
import cellStore from 'Stores/selectedCell';
import { Provider } from 'react-redux';

import './styles/style.scss';

function App(){
    return (
        <Provider store={cellStore}>
            <Wrapper />
        </Provider>
    )
};

export default App;