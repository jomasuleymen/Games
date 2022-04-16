import httpService from "@services/httpService";
import toast from "@utils/toast";

const loadRecords = async () => {
    return await httpService.get("sudoku/record");
};

const uploadResult = async (data) => {
    return await httpService.put("sudoku/record", data).catch(function (error) {
        toast.warning("Please login for saving your records"); // setError sudoku actions later
    });
};

const generateSudoku = async (difficulty) => {
    return await httpService
        .get(`sudoku/generate?difficulty=${difficulty.toLocaleLowerCase()}`)
        .catch(function (error) {
            console.log(error); // setError sudoku actions later
        });
};

export { loadRecords, uploadResult, generateSudoku };
