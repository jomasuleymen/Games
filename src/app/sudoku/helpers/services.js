import httpService from "@services/httpService";

const loadRecords = async (callBack) => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) return;

    httpService
        .get("sudoku/records", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(callBack)
        .catch((err) => {
            console.log(err.message);
        });
};

const uploadResult = async (data, callBack) => {
    httpService
        .put("sudoku/records", data)
        .then(callBack)
        .catch(function (error) {
            console.log(error.message);
        });
};

const generateSudoku = async (difficulty, callBack) => {
    httpService
        .get(`sudoku/board?difficulty=${difficulty.toLocaleLowerCase()}`)
        .then(callBack)
        .catch((err) => {
            console.log(err.message);
        });
};

export { loadRecords, uploadResult, generateSudoku };
