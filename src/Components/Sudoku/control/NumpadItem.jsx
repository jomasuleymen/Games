import React from 'react';

import board from '../data/board-data';

function NumpadItem({num}){
    return (
        <div className='numpad-item' onClick={() => { board.insertToSelectedCell(num) }}>
            {num}
        </div>
    );
}

export default NumpadItem;