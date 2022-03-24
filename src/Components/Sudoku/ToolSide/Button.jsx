import React from 'react';

import { insertToSelectedCell } from 'Utils/sudokuUtils';

function NumButton({num}){
    return (
        <div className='num-button' onClick={() => { insertToSelectedCell(num) }}>
            {num}
        </div>
    );
}

export default NumButton;