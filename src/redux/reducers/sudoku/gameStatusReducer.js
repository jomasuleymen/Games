import {PAUSE, RESUME, TOGGLE} from '@types/sudoku';

const isPaused = false;

export default function setStatus(status=isPaused, action){
    switch(action.type){
        case PAUSE: return true;
        case RESUME: return false;
        case TOGGLE: return !status;
        default: return status;
    }
}