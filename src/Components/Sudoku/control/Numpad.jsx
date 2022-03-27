import React from 'react';
import NumpadItem from './NumpadItem';

function Numpad(){
    return (
        <div className='numpad'>
            <div className='numpad-row'>
                <NumpadItem num={1} />
                <NumpadItem num={2} />
                <NumpadItem num={3} />
            </div>
            <div className='numpad-row'>
                <NumpadItem num={4} />
                <NumpadItem num={5} />
                <NumpadItem num={6} />
            </div>
            <div className='numpad-row'>
                <NumpadItem num={7} />
                <NumpadItem num={8} />
                <NumpadItem num={9} />
            </div>
        </div>
    );
}

export default Numpad;