import axios from "axios";

import { solvePuzzle, selectCell } from "Utils/sudokuUtils";

const notes = {
    enabled: false,
    noteBoard: {

    }
}

const initialData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const errNumber = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const answer = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const currentData = [...initialData];
let gameId = 0;

function isReadOnly(row, col) {
    return initialData[row][col] != 0;
}

function clearData() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            answer[i][j] = 0;
            errNumber[i][j] = 0;
        }
    }

    notes.enabled = false;
    for (key in notes['noteBoard'])
        delete notes['noteBoard'][key]

}

function isCellEmpty(row, col){
    return currentData[row][col] == 0;
}

function initGame() {
    clearData();
    gameId += 1;
    return axios.get('http://127.0.0.1:3000/easy')
        .then(resData => {
            resData.data.forEach((rowData, rowIndex) => {
                initialData[rowIndex] = [...rowData];
                currentData[rowIndex] = [...rowData];
            });
            solvePuzzle(initialData); // answer = 
            selectCell(0, 0);
            return currentData;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { initialData, errNumber, currentData, answer, isReadOnly, initGame, gameId, notes, isCellEmpty};
