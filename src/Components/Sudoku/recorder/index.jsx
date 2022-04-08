import React from "react";
import { useSelector } from "react-redux";
import "./recorder.scss";

function Recorder() {
    const record = useSelector(({ sudoku }) => sudoku.record);

    return (
        <div className="recorder">
            <table className="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col">Record</th>
                        <th scope="col">min</th>
                        <th scope="col">average</th>
                        <th scope="col">played</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <label className="badge bg-success">Easy</label>
                        </th>
                        <td>{record.easy.min || "-"}</td>
                        <td>{record.easy.average || "-"}</td>
                        <td>{record.easy.played || "-"}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label className="badge bg-warning text-dark">
                                Medium
                            </label>
                        </th>
                        <td>{record.medium.min || "-"}</td>
                        <td>{record.medium.average || "-"}</td>
                        <td>{record.medium.played || "-"}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label className="badge bg-danger">Hard</label>
                        </th>
                        <td>{record.hard.min || "-"}</td>
                        <td>{record.hard.average || "-"}</td>
                        <td>{record.hard.played || "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Recorder;
