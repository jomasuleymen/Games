import React from 'react';
import NumpadItem from './NumpadItem';

function Numpad(){
    return (
        <div id='numpad'>
                <NumpadItem num={1} />
                <NumpadItem num={2} />
                <NumpadItem num={3} />
                <NumpadItem num={4} />
                <NumpadItem num={5} />
                <NumpadItem num={6} />
                <NumpadItem num={7} />
                <NumpadItem num={8} />
                <NumpadItem num={9} />
        </div>
    );
}

export default Numpad;