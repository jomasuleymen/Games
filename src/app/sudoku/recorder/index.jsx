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
                        <td>{record.Easy.min || "-"}</td>
                        <td>{record.Easy.average || "-"}</td>
                        <td>{record.Easy.played || "-"}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label className="badge bg-warning text-dark">
                                Medium
                            </label>
                        </th>
                        <td>{record.Medium.min || "-"}</td>
                        <td>{record.Medium.average || "-"}</td>
                        <td>{record.Medium.played || "-"}</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label className="badge bg-danger">Hard</label>
                        </th>
                        <td>{record.Hard.min || "-"}</td>
                        <td>{record.Hard.average || "-"}</td>
                        <td>{record.Hard.played || "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Recorder;
