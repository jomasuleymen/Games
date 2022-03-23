import { errNumber } from 'Components/Sudoku/data';

function addIfError(row, col, value, data){

    let rowSquareIndex = row - row%3;
    let colSquareIndex = col - col%3;
    
    for(let i = 0; i < 9; i++){
        if (value == data[i][col] && i != row){
            errNumber[i][col] += 1;
            errNumber[row][col] += 1;
        }
        
        if (value == data[row][i] && i != col){
            errNumber[row][i] += 1;
            errNumber[row][col] += 1;
        }    
        
        if (value == data[rowSquareIndex][colSquareIndex] && rowSquareIndex != row && colSquareIndex != col){
            errNumber[rowSquareIndex][colSquareIndex] += 1;
            errNumber[row][col] += 1;
        } 
        colSquareIndex += 1;
        
        if ((i+1) % 3 == 0){
            rowSquareIndex += 1;
            colSquareIndex = col - col%3;
        }
    }
    
}

function subtractIfError(row, col, value, data){
    
    let rowSquareIndex = row - row%3;
    let colSquareIndex = col - col%3;

    for(let i = 0; i < 9; i++){
        if (value == data[i][col] && i != row){
            errNumber[i][col] -= 1;
        }

        if (value == data[row][i] && i != col){
            errNumber[row][i] -= 1;
        }

        
        if (value == data[rowSquareIndex][colSquareIndex] && rowSquareIndex != row && colSquareIndex != col)
            errNumber[rowSquareIndex][colSquareIndex] -= 1;

        colSquareIndex += 1;
        
        if ((i+1) % 3 == 0){
            rowSquareIndex += 1;
            colSquareIndex = col - col%3;
        }
    }
    errNumber[row][col] = 0;
}

export {
    addIfError,
    subtractIfError
};