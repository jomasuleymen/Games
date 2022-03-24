
const selectedCell = {
    row: 0,
    col: 0,
    squareRowBegin: 0,
    squareColBegin: 0,
    value: -1,
};

function cellReducer(state=selectedCell, action){
    switch(action.type){
        case 'select': return {
            ...action.payload
        };
        default: return state;
    }
}