import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "../components/Header";

function ResetPassword() {
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
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
    }, []);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const formData = {
            password: data.oldpassword,
            newpassword: data.password
        };
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/password`, formData)
            .then((res) => {
                swal("Sửa mật khẩu thành công");
                navigate("/profile");
            })
            .catch((err) => swal("Sai tên đăng nhập hoặc mật khẩu"));
    };
    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Đổi Mật Khẩu</h1>
                <div className="content_profile">
                    <form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div>
                                <input
                                    className="ipadd"
                                    type="password"
                                    {...register("oldpassword", {
                                        required: true
                                    })}
                                    placeholder="Mật khẩu cũ"
                                />
                            </div>
                            <div>
                                {" "}
                                <input
                                    className="ipadd"
                                    type="password"
                                    {...register("password", {
                                        required: true
                                    })}
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div>
                                {" "}
                                <input
                                    className="ipadd"
                                    type="password"
                                    {...register("checkpassword", {
                                        required: true
                                    })}
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </div>
                            <button type="submit" className="btn-submit">
                                Xác nhận
                            </button>
                        </div>
                    </form>
                </div>

                <Footer />
            </div>
        </>
    );
}
export default ResetPassword;
