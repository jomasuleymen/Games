class History {

    constructor() {
        this.history = [];
    }

    addState(row, col, value, note) {
        note = note ? [...note] : undefined;
        const prevState = this.history.slice(-1)[0];
        if (prevState && row == prevState.row && col == prevState.col && value == prevState.value) {
            if (prevState.note == note) return;
            if (prevState.note && note){
                let same = true;
                for (let i = 0; i < note.length; i++) {
                    if (note[i] != prevState.note[i]) {
                        same = false;
                        break;
                    }
                }
                if (same) return;
            }
        }
        console.log(prevState)
        console.log({row, col, value, note})
        this.history.push({ row, col, value, note });
    }

    popState() {
        if (this.history.length > 0) {
            return this.history.pop();
        }
        return false;
    }

    filterHistory(row, col) {
        this.history = this.history.filter(state => state.row != row && state.col != col);
    }

    clear() {
        this.history = [];
    }
}

export default History;