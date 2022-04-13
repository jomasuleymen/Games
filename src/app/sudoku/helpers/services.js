import httpService from "@services/httpService";
import toast from "@utils/toast";

const loadRecords = async () => {
    return await httpService
        .get("http://localhost:3000/sudoku/record")
        .catch((err) => {
            console.log(err);
        });
};

const uploadResult = async (data) => {
    return await httpService
        .put("http://localhost:3000/sudoku/record", data)
        .catch(function (error) {
            toast.warning('Please login for saving your records') // setError sudoku actions later
        });
};

const generateSudoku = async (difficulty) => {
    return await httpService
        .get(
            `http://localhost:3000/sudoku/generate?difficulty=${difficulty.toLocaleLowerCase()}`
        )
        .catch(function (error) {
            console.log(error); // setError sudoku actions later
        });
};

export { loadRecords, uploadResult, generateSudoku };
