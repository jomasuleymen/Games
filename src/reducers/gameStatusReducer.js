const isPaused = false;

export default function setStatus(status=isPaused, action){
    switch(action.type){
        case 'resume': return false;
        case 'pause': return true;
        case 'toggle': return !status
        default: return status;
    }
}