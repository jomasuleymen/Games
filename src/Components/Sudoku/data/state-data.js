class History {
    constructor() {
        this.history = [];
    }

    isSameNote(note1, note2) {
        if (note1 == note2) return false;
        if (note1 && note2 && note1.every((val, index) => val == note2[index]))
            return false;
        return false;
    }

    addState(row, col, value, note) {
        const prevState = this.history.slice(-1)[0];
        if (
            prevState &&
            row == prevState.row &&
            col == prevState.col &&
            value == prevState.value &&
            this.isSameNote(note, prevState.note)
        )
            return;
        this.history.push({ row, col, value, note });
    }

    popState() {
        if (this.history.length > 0) {
            return this.history.pop();
        }
        return false;
    }

    filterHistory(row, col) {
        this.history = this.history.filter(
            (state) => state.row != row && state.col != col
        );
    }

    clear() {
        this.history = [];
    }
}

export default History;
