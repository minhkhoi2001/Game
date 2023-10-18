import React from "react";

const Results = ({ isOpen, total, closePopup }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-backdrop">
            <div className="popup-main">
                <div className="popup-content" style={{ padding: "0" }}>
                    <table id="table-xsmb" className="table-result table table-bordered table-striped table-xsmb">
                        <tbody>
                            <tr>
                                <th style={{ width: "10%" }}>ĐB</th>
                                <td>
                                    <span id="mb_prize_0" className="special-prize div-horizontal">
                                        {total[0].dacbiet}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td>
                                    <span id="mb_prize_1" className="prize1 div-horizontal">
                                        {total[0].nhat}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>
                                    <span id="mb_prize_2" className="prize2 div-horizontal">
                                        {total[0].hai.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_3" className="prize2 div-horizontal">
                                        {total[0].hai.split(" ")[1]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>
                                    <span id="mb_prize_4" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_5" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[1]}
                                    </span>
                                    <span id="mb_prize_6" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[2]}
                                    </span>
                                    <span id="mb_prize_7" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[3]}
                                    </span>
                                    <span id="mb_prize_8" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[4]}
                                    </span>
                                    <span id="mb_prize_9" className="prize3 div-horizontal">
                                        {total[0].ba.split(" ")[5]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>
                                    <span id="mb_prize_10" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_11" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[1]}
                                    </span>
                                    <span id="mb_prize_12" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[2]}
                                    </span>
                                    <span id="mb_prize_13" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[3]}
                                    </span>
                                    <span id="mb_prize_13" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[4]}
                                    </span>
                                    <span id="mb_prize_13" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[5]}
                                    </span>
                                    <span id="mb_prize_13" className="prize4 div-horizontal">
                                        {total[0].tu.split(" ")[6]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>
                                    <span id="mb_prize_14" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_15" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[1]}
                                    </span>
                                    <span id="mb_prize_16" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[2]}
                                    </span>
                                    <span id="mb_prize_17" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[3]}
                                    </span>
                                    <span id="mb_prize_18" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[4]}
                                    </span>
                                    <span id="mb_prize_19" className="prize5 div-horizontal">
                                        {total[0].nam.split(" ")[5]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>
                                    <span id="mb_prize_20" className="prize6 div-horizontal">
                                        {total[0].sau.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_21" className="prize6 div-horizontal">
                                        {total[0].sau.split(" ")[1]}
                                    </span>
                                    <span id="mb_prize_22" className="prize6 div-horizontal">
                                        {total[0].sau.split(" ")[2]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>
                                    <span id="mb_prize_23" className="prize7 div-horizontal">
                                        {total[0].bay.split(" ")[0]}
                                    </span>
                                    <span id="mb_prize_24" className="prize7 div-horizontal">
                                        {total[0].bay.split(" ")[1]}
                                    </span>
                                    <span id="mb_prize_25" className="prize7 div-horizontal">
                                        {total[0].bay.split(" ")[2]}
                                    </span>
                                    <span id="mb_prize_26" className="prize7 div-horizontal">
                                        {total[0].bay.split(" ")[3]}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>
                                    <span id="mb_prize_26" className="prize8 div-horizontal">
                                        {total[0].tam}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={closePopup}
                    className="popup-close"
                    style={{
                        background: "#00b977",
                        boxShadow: "none",
                        textShadow: "none"
                    }}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default Results;
