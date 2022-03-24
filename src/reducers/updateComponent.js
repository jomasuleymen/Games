const initState = 0;

function updateComponent(state=initState, action){
    switch(action.type){
        default: return state + 1;
    }
}