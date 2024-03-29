import { Box, Container } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

function Setting() {
    const [setting, setSetting] = useState();
    const [load, setLoad] = useState(true);
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("user");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (load === true) {
            axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
                setSetting(res.data.data[0]);
                setLoad(false);
            });
        }
    }, [load]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: setting?._id,
            doiben: Number(e.target.doiben.value),

            xucsac5p: Number(e.target.xucsac5p.value),
            xucsac3p: Number(e.target.xucsac5p.value),
            haitrung3: Number(e.target.haitrung3.value),
            haitrung5: Number(e.target.haitrung5.value),

            batrung3: Number(e.target.batrung3.value),
            batrung5: Number(e.target.batrung5.value),

            lothuong: Number(e.target.lothuong.value),
            bacang: Number(e.target.bacang.value),
            de: Number(e.target.de.value),
            loxien2: Number(e.target.loxien2.value),
            loxien3: Number(e.target.loxien3.value),
            loxien4: Number(e.target.loxien4.value),
            truotxien4: Number(e.target.truotxien4.value),
            truotxien8: Number(e.target.truotxien8.value),
            truotxien10: Number(e.target.truotxien10.value),
            boncangdacbiet: Number(e.target.boncangdacbiet.value),
            mblothuong: Number(e.target.mblothuong.value),
            mbbacang: Number(e.target.mbbacang.value),
            mbde: Number(e.target.mbde.value),
            mbloxien2: Number(e.target.mbloxien2.value),
            mbloxien3: Number(e.target.mbloxien3.value),
            mbloxien4: Number(e.target.mbloxien4.value),
            mbtruotxien4: Number(e.target.truotxien4.value),
            mbtruotxien8: Number(e.target.truotxien8.value),

            mtlothuong: Number(e.target.mtlothuong.value),
            mtbacang: Number(e.target.mtbacang.value),
            mtde: Number(e.target.mtde.value),
            mtloxien2: Number(e.target.mtloxien2.value),
            mtloxien3: Number(e.target.mtloxien3.value),
            mtloxien4: Number(e.target.mtloxien4.value),
            mttruotxien4: Number(e.target.truotxien4.value),
            mttruotxien8: Number(e.target.truotxien8.value),

            mnlothuong: Number(e.target.mnlothuong.value),
            mnbacang: Number(e.target.mnbacang.value),
            mnde: Number(e.target.mnde.value),
            mnloxien2: Number(e.target.mnloxien2.value),
            mnloxien3: Number(e.target.mnloxien3.value),
            mnloxien4: Number(e.target.mnloxien4.value),
            mntruotxien4: Number(e.target.truotxien4.value),
            mntruotxien8: Number(e.target.truotxien8.value),
            tx1: Number(e.target.tx1.value),
            tx3: Number(e.target.tx3.value),
            tx5: Number(e.target.tx5.value),
            aff: Number(e.target.aff.value),
            le: Number(e.target.le.value),
            chan: Number(e.target.chan.value),
            f3trang: Number(e.target.f3trang.value),
            f3den: Number(e.target.f3den.value),
            ftrang: Number(e.target.ftrang.value),
            fden: Number(e.target.fden.value)
        };
        console.log(formData);
        axios
            .put(`${process.env.REACT_APP_API_URL}/setting/update`, formData)
            .then((res) => {
                setLoad(true);
                swal("Sửa thông tin trò chơi thành công!");
            })
            .catch((res) => setLoad(true));
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <DashboardLayout>
                    {
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 8
                            }}>
                            <Container maxWidth={false}>
                                <div style={{ fontSize: "25px", fontWeight: 700 }}>Cài đặt trả thưởng</div>
                                <div style={{ marginTop: "20px" }}>
                                    <form className="setting" onSubmit={handleSubmit}>
                                        <div style={{ display: "none" }}>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                Keno
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Đôi bên</label>
                                                    <input defaultValue={setting?.doiben} type="number" name="doiben" step="any" id="doiben" className="input_setting" />
                                                </div>
                                            </div>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                Xúc sắc
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Súc xắc 3p</label>
                                                    <input defaultValue={setting?.xucsac3p} type="number" name="xucsac3p" step="any" id="xucsac3p" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Hai số trùng Xúc sắc 3p</label>
                                                    <input defaultValue={setting?.haitrung3} type="number" name="haitrung3" step="any" id="haitrung3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba số trùng Xúc sắc 3p</label>
                                                    <input defaultValue={setting?.batrung3} type="number" name="batrung3" step="any" id="batrung3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Súc xắc 5p</label>
                                                    <input defaultValue={setting?.xucsac5p} type="number" name="xucsac5p" step="any" id="xucsac5p" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Hai số trùng Xúc sắc 5p</label>
                                                    <input defaultValue={setting?.haitrung5} type="number" name="haitrung5" step="any" id="haitrung5" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba số trùng Xúc sắc 5p</label>
                                                    <input defaultValue={setting?.batrung5} type="number" name="batrung5" step="any" id="batrung5" className="input_setting" />
                                                </div>
                                            </div>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                Xổ số nhanh
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô thường</label>
                                                    <input defaultValue={setting?.lothuong} type="number" name="lothuong" step="any" id="lothuong" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba càng</label>
                                                    <input defaultValue={setting?.bacang} type="number" name="bacang" step="any" id="bacang" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Đề</label>
                                                    <input defaultValue={setting?.de} type="number" step="any" name="de" id="de" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 2</label>
                                                    <input defaultValue={setting?.loxien2} type="number" name="loxien2" step="any" id="loxien2" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 3</label>
                                                    <input defaultValue={setting?.loxien3} type="number" name="loxien3" step="any" id="loxien3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 4</label>
                                                    <input defaultValue={setting?.loxien4} type="number" name="loxien4" step="any" id="loxien4" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 4</label>
                                                    <input
                                                        defaultValue={setting?.truotxien4}
                                                        type="number"
                                                        name="truotxien4"
                                                        step="any"
                                                        id="truotxien4"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 8</label>
                                                    <input
                                                        defaultValue={setting?.truotxien8}
                                                        type="number"
                                                        name="truotxien8"
                                                        step="any"
                                                        id="truotxien8"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 10</label>
                                                    <input
                                                        defaultValue={setting?.truotxien10}
                                                        type="number"
                                                        name="truotxien10"
                                                        step="any"
                                                        id="truotxien10"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>4 cang dac biet</label>
                                                    <input
                                                        defaultValue={setting?.boncangdacbiet}
                                                        type="number"
                                                        name="boncangdacbiet"
                                                        step="any"
                                                        id="boncangdacbiet"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                XSMB
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô thường</label>
                                                    <input
                                                        defaultValue={setting?.mblothuong}
                                                        type="number"
                                                        name="mblothuong"
                                                        step="any"
                                                        id="mblothuong"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba càng</label>
                                                    <input defaultValue={setting?.mbbacang} type="number" name="mbbacang" step="any" id="mbbacang" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Đề</label>
                                                    <input defaultValue={setting?.mbde} type="number" step="any" name="mbde" id="mbde" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 2</label>
                                                    <input defaultValue={setting?.mbloxien2} type="number" name="mbloxien2" step="any" id="mbloxien2" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 3</label>
                                                    <input defaultValue={setting?.mbloxien3} type="number" name="mbloxien3" step="any" id="mbloxien3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 4</label>
                                                    <input defaultValue={setting?.mbloxien4} type="number" name="mbloxien4" step="any" id="mbloxien4" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 4</label>
                                                    <input
                                                        defaultValue={setting?.truotxien4}
                                                        type="number"
                                                        name="mbtruotxien4"
                                                        step="any"
                                                        id="mbtruotxien4"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 8</label>
                                                    <input
                                                        defaultValue={setting?.truotxien8}
                                                        type="number"
                                                        name="mbtruotxien8"
                                                        step="any"
                                                        id="mbtruotxien8"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                XSMT
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô thường</label>
                                                    <input
                                                        defaultValue={setting?.mtlothuong}
                                                        type="number"
                                                        name="mtlothuong"
                                                        step="any"
                                                        id="mtlothuong"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba càng</label>
                                                    <input defaultValue={setting?.mtbacang} type="number" name="mtbacang" step="any" id="mtbacang" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Đề</label>
                                                    <input defaultValue={setting?.mtde} type="number" step="any" name="mtde" id="mtde" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 2</label>
                                                    <input defaultValue={setting?.mtloxien2} type="number" name="mtloxien2" step="any" id="mtloxien2" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 3</label>
                                                    <input defaultValue={setting?.mtloxien3} type="number" name="mtloxien3" step="any" id="mtloxien3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 4</label>
                                                    <input defaultValue={setting?.mtloxien4} type="number" name="mtloxien4" step="any" id="mtloxien4" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 4</label>
                                                    <input
                                                        defaultValue={setting?.truotxien4}
                                                        type="number"
                                                        name="mttruotxien4"
                                                        step="any"
                                                        id="mttruotxien4"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 8</label>
                                                    <input
                                                        defaultValue={setting?.truotxien8}
                                                        type="number"
                                                        name="mttruotxien8"
                                                        step="any"
                                                        id="mttruotxien8"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <h3
                                                style={{
                                                    width: "100%",
                                                    flex: "0 0 100%",
                                                    textAlign: "left",
                                                    fontWeight: "bold",
                                                    margin: "30px 10px 10px"
                                                }}>
                                                XSMN
                                            </h3>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô thường</label>
                                                    <input
                                                        defaultValue={setting?.mnlothuong}
                                                        type="number"
                                                        name="mnlothuong"
                                                        step="any"
                                                        id="mnlothuong"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Ba càng</label>
                                                    <input defaultValue={setting?.mnbacang} type="number" name="mnbacang" step="any" id="mnbacang" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Đề</label>
                                                    <input defaultValue={setting?.mnde} type="number" step="any" name="mnde" id="mnde" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 2</label>
                                                    <input defaultValue={setting?.mnloxien2} type="number" name="mnloxien2" step="any" id="mnloxien2" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 3</label>
                                                    <input defaultValue={setting?.mnloxien3} type="number" name="mnloxien3" step="any" id="mnloxien3" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Lô xiên 4</label>
                                                    <input defaultValue={setting?.mnloxien4} type="number" name="mnloxien4" step="any" id="mnloxien4" className="input_setting" />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 4</label>
                                                    <input
                                                        defaultValue={setting?.truotxien4}
                                                        type="number"
                                                        name="mntruotxien4"
                                                        step="any"
                                                        id="mntruotxien4"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_col">
                                                <div className="form_group">
                                                    <label>Trượt xiên 8</label>
                                                    <input
                                                        defaultValue={setting?.truotxien8}
                                                        type="number"
                                                        name="mntruotxien8"
                                                        step="any"
                                                        id="mntruotxien8"
                                                        className="input_setting"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h3
                                            style={{
                                                width: "100%",
                                                flex: "0 0 100%",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                margin: "30px 10px 10px"
                                            }}>
                                            Khác
                                        </h3>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Hoa hồng</label>
                                                <input defaultValue={setting?.aff} type="number" name="aff" step="any" id="aff" className="input_setting" />
                                            </div>
                                        </div>
                                        <h3
                                            style={{
                                                width: "100%",
                                                flex: "0 0 100%",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                margin: "30px 10px 10px"
                                            }}>
                                            Tài xỉu
                                        </h3>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Tài xỉu 1p</label>
                                                <input defaultValue={setting?.tx1} type="number" name="tx1" step="any" id="tx1" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Tài xỉu 3p</label>
                                                <input defaultValue={setting?.tx3} type="number" name="tx3" step="any" id="tx3" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Tài xỉu 5p</label>
                                                <input defaultValue={setting?.tx5} type="number" name="tx5" step="any" id="tx5" className="input_setting" />
                                            </div>
                                        </div>
                                        <h3
                                            style={{
                                                width: "100%",
                                                flex: "0 0 100%",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                margin: "30px 10px 10px"
                                            }}>
                                            Xóc đĩa
                                        </h3>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Chẳn</label>
                                                <input defaultValue={setting?.chan} type="number" name="chan" step="any" id="chan" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>Lẻ</label>
                                                <input defaultValue={setting?.le} type="number" name="le" step="any" id="le" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>4 trắng</label>
                                                <input defaultValue={setting?.ftrang} type="number" name="ftrang" step="any" id="ftrang" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>4 đen</label>
                                                <input defaultValue={setting?.fden} type="number" name="fden" step="any" id="fden" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>3 trắng 1 đen</label>
                                                <input defaultValue={setting?.f3trang} type="number" name="f3trang" step="any" id="f3trang" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col">
                                            <div className="form_group">
                                                <label>3 đen 1 trắng</label>
                                                <input defaultValue={setting?.f3den} type="number" name="f3den" step="any" id="f3den" className="input_setting" />
                                            </div>
                                        </div>
                                        <div className="form_col" style={{ clear: "both", width: "100%" }}>
                                            <button type="submit" className="btn_setting">
                                                Lưu
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Container>
                        </Box>
                    }
                </DashboardLayout>
            </ThemeProvider>
        </>
    );
}

export default Setting;
