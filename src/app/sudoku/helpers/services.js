import httpService from "@services/httpService";
import toast from "@utils/toast";
import sudokuActions from "@store/sudoku/sudokuActions";

const loadRecords = async (callBack) => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) return;

    httpService
        .get("sudoku/records", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(callBack)
        .catch((err) => {
            toast.error('Please check your network and choose level again.');
            sudokuActions.gameFailed();
        });
};

const uploadResult = async (data, callBack) => {
    httpService
        .put("sudoku/records", data)
        .then(callBack)
        .catch(function (error) {
            toast.error('Please check your network and choose level again.');
            sudokuActions.gameFailed();
        });
};

const generateSudoku = async (difficulty, callBack) => {
    httpService
        .get(`sudoku/board?difficulty=${difficulty.toLocaleLowerCase()}`)
        .then(callBack)
        .catch((err) => {
            console.log(err)
            toast.error('Please check your network and choose level again.');
            sudokuActions.gameFailed();
        });
};

export { loadRecords, uploadResult, generateSudoku };
