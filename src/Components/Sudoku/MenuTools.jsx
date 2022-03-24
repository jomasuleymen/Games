import React from 'react';

import Tools from './ToolSide/Tools';
import Buttons from './ToolSide/Buttons';
import NewGame from './ToolSide/newGame';

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