import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "../components/Header";

function TransferMoney() {
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
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
            setProfile(res.data.data);
        });
    }, []);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const formData = {
            username: data.username,
            money: data.money
        };
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/transfer`, formData)
            .then((res) => {
                swal("Chuyển tiền thành công!");
                navigate("/profile");
            })
            .catch((err) => swal("Sai người nhận hoặc số dư không đủ"));
    };
    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Chuyển tiền</h1>
                <div className="content_profile">
                    <form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div>
                                <input
                                    className="ipadd"
                                    type="username"
                                    {...register("username", {
                                        required: true
                                    })}
                                    placeholder="Người nhận"
                                />
                            </div>
                            <div>
                                {" "}
                                <input className="ipadd" type="number" {...register("money", { required: true })} placeholder="Số tiền" />
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
export default TransferMoney;
