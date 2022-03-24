import React from 'react';
import NumButton from './Button';

function Buttons(){
    return (
        <div className='buttons'>
            <div className='button-row'>
                <NumButton num={1} />
                <NumButton num={2} />
                <NumButton num={3} />
            </div>
            <div className='button-row'>
                <NumButton num={4} />
                <NumButton num={5} />
                <NumButton num={6} />
            </div>
            <div className='button-row'>
                <NumButton num={7} />
                <NumButton num={8} />
                <NumButton num={9} />
            </div>
        </div>
    );
}

export default Buttons;