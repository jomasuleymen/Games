import React from 'react';
import UndoTool from './UndoTool';

function Tools(){
    return (
        <div className='tools'>
            <UndoTool name="Undo" />
            <UndoTool name="Erase" />
            <UndoTool name="Notes" />
            <UndoTool name="Hint" />
        </div>
    );
}

export default Tools;