class Note {
    constructor() {
        this.note = {};
        this.isEnabled = false;
    }

    getKey(row, col){
        return `${row}${col}`
    }
    
    addCellNote(row, col, noteValue){
        const cellKey = this.getKey(row, col);
        let cellNote = this.note[cellKey];
        
        if (!cellNote){
            this.note[cellKey] = Array(9).fill(false);
            cellNote = this.note[cellKey];
        }
        
        this.note[cellKey][noteValue-1] = !this.note[cellKey][noteValue-1]; // toggle cell note value
    }

    setCellNote(row, col, note){
        const cellKey = this.getKey(row, col);
        if (note)
            this.note[cellKey] = [...note];
    }
    
    getCellNote(row, col){
        return this.note[this.getKey(row, col)];
    }
    
    clear(){
        for (let key in this.note)
            delete this.note[key];
    }

    eraseSelectedCellNote(row, col){
        const cellKey = this.getKey(row, col);
        delete this.note[cellKey];
    }

    toggle(){
        this.isEnabled = !this.isEnabled;
    }

}

export default Note;