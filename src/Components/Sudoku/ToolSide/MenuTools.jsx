import React from 'react';

import Tools from './Tools';
import Buttons from './Buttons';
import NewGame from './newGame';

import 'Styles/tools.scss';

function ConfigBlock({newGame}){
    return (
        <div className='config-block'>
            <NewGame newGame={newGame} />
            <Tools />
            <Buttons />
        </div>
    );
}

export default React.memo(ConfigBlock);