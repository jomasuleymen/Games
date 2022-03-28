function zeroFilledMatrix(){
    return Array(9)
            .fill()
            .map(() =>
                Array(9).fill(0)
            );
}


export { zeroFilledMatrix };