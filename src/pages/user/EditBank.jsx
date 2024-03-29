import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Header from "../components/Header";

function EditBank() {
    const [profile, setProfile] = useState(null);

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
    const { id } = useParams();
    const { register, handleSubmit, setError } = useForm();
    const [bank, setBank] = useState(null);
    //const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
        axios
            .get(`${process.env.REACT_APP_API_URL}/bank/user/${id}`, {})
            .then((res) => {
                setBank(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
    }, []);
    const onSubmit = (data) => {
        const formData = {
            id: id,
            name_bank: data.name_bank,
            stk: data.stk,
            fullname: data.fullname
        };
        axios
            .post(`${process.env.REACT_APP_API_URL}/bank/updateBank`, formData)
            .then((res) => {
                swal("Thành công", "Sửa ngân hàng thành công", "success");
            })
            .catch((err) =>
                setError("money", {
                    type: "minLength",
                    message: "Lỗi giao dịch 404!"
                })
            );
    };
    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Sửa Thông Tin</h1>
                <div className="content_profile" style={{ margin: "1.8rem 0 0" }}>
                    {bank != null ? (
                        <>
                            <form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div>
                                        <label>Tên ngân hàng</label>
                                        <input
                                            className="ipadd"
                                            type="text"
                                            {...register("name_bank", {
                                                required: true
                                            })}
                                            placeholder="Tên ngân hàng"
                                            defaultValue={bank.name_bank}
                                        />
                                    </div>
                                    <div>
                                        {" "}
                                        <label>Số tài khoản</label>
                                        <input
                                            className="ipadd"
                                            type="number"
                                            {...register("stk", {
                                                required: true
                                            })}
                                            placeholder="Số tài khoản"
                                            defaultValue={bank.stk}
                                        />
                                    </div>
                                    <div>
                                        {" "}
                                        <label>Chủ tài khoản</label>
                                        <input
                                            className="ipadd"
                                            type="text"
                                            {...register("fullname", {
                                                required: true
                                            })}
                                            placeholder="Chủ tài khoản"
                                            defaultValue={bank.fullname}
                                        />
                                    </div>
                                    <button type="submit" className="btn-submit">
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div>Đang load dữ liệu</div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
export default EditBank;
