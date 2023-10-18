import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import Header from '../components/Header';

function RoomChat() {
    const [profile, setProfile] = useState(null);
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('user');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
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
            .catch((err) => localStorage.removeItem('user'));
    }, []);
    const localdata = localStorage.getItem('currentUser');

    return (
        <>
            <div className="main" style={{ background: '#fff' }}>
                <Header profile={profile} />
                {profile ? (
                    <div
                        style={{
                            position: 'relative',
                            height: 'calc(100vh - 2.96rem)',
                            margin: '0 -0.32rem 0 -0.32rem'
                        }}>
                        {/*<div className="hide-chatbar">Phòng Chat</div>*/}
                        {localdata ? (
                            <iframe
                                title="Chat"
                                src={`https://chat.best96tx.com?data=${localdata}/`}
                                allowtransparency="true"
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}></iframe>
                        ) : (
                            <div className="loading">
                                <div className="loader"></div>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
            <Footer />
        </>
    );
}

export default RoomChat;
