import React from 'react';

import NewGameBtn from './NewGameBtn';
import ControlItems from './ControlItems';
import Numpad from './Numpad';

import '@styles/control.scss';

function Control({startNewGame}){
    return (
        <div className='control'>
            <NewGameBtn startNewGame={startNewGame} />
            <ControlItems />
            <Numpad />
        </div>
    );
}

export default React.memo(Control);