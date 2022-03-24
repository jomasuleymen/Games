import React from 'react';

import Tools from './Tools';
import Buttons from './Buttons';
import NewGame from './newGame';

import 'Styles/tools.scss';

function ConfigBlock(){
    return (
        <div className='config-block'>
            <NewGame />
            <Tools />
            <Buttons />
        </div>
    );
}

export default ConfigBlock;