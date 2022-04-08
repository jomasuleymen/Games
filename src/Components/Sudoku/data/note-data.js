class Note {
    constructor() {
        this.cellNotesCount = Array(9)
            .fill()
            .map(() =>
                Array(9).fill(0)
            ); /* how many note number has each cell */
        this.notes = Array(9)
            .fill()
            .map(() =>
                Array(9)
                    .fill()
                    .map(() => Array(9).fill(false))
            ); /* each cell has 9 boolean notes which determines is note num enabled  */
            
        this.isEnabled = false;
    }

    noteCount(row, col) {
        return this.cellNotesCount[row][col];
    }

    addNote(row, col, notePosition) {
        const cellNotes = this.getNote(row, col);
        cellNotes[notePosition - 1] = !cellNotes[notePosition - 1]; // toggle cell note value
        if (cellNotes[notePosition - 1] == true)
            this.cellNotesCount[row][col] += 1;
        else
            this.cellNotesCount[row][col] -= 1;    
    }

    setNote(row, col, cellNotes) {
        if (cellNotes && cellNotes instanceof Array && cellNotes.length == 9){
            this.notes[row][col] = cellNotes;
            this.cellNotesCount[row][col] = cellNotes.filter(el => el == true).length;
        }
    }

    getNote(row, col) {
        return this.notes[row][col];
    }

    eraseNote(row, col) {
        if (this.noteCount(row, col) > 0){
            this.getNote(row, col).fill(false);
            this.cellNotesCount[row][col] = 0;
        }
    }

    clear() {
        this.notes.forEach((row) => row.map((notes) => notes.fill(false)));
        this.cellNotesCount.forEach((row) => row.fill(0));
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
    }
}

export default Note;
