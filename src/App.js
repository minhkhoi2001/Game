import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import dm from "./theme/enc";

// Game
import Keno1 from "./pages/game/Keno/Keno1";
import Keno3 from "./pages/game/Keno/Keno3";
import Keno5 from "./pages/game/Keno/Keno5";
import Xucxac3 from "./pages/game/Xucxac/Xucxac3";
import Xucxac5 from "./pages/game/Xucxac/Xucxac5";
import Taixiu1 from "./pages/game/Taixiu/Taixiu1";
// XS 3p
import Lo from "./pages/game/Xoso3p/Lo";
import Bacang from "./pages/game/Xoso3p/Bacang";
import De from "./pages/game/Xoso3p/De";
import Loxien2 from "./pages/game/Xoso3p/Loxien2";
import Loxien3 from "./pages/game/Xoso3p/Loxien3";
import Loxien4 from "./pages/game/Xoso3p/Loxien4";
import Truotxien4 from "./pages/game/Xoso3p/Truotxien4";
import Truotxien8 from "./pages/game/Xoso3p/Truotxien8";
// XS 5p
import Xoso5pLo from "./pages/game/Xoso5p/Lo";
import Xoso5pBacang from "./pages/game/Xoso5p/Bacang";
import Xoso5pDe from "./pages/game/Xoso5p/De";
import Xoso5pLoxien2 from "./pages/game/Xoso5p/Loxien2";
import Xoso5pLoxien3 from "./pages/game/Xoso5p/Loxien3";
import Xoso5pLoxien4 from "./pages/game/Xoso5p/Loxien4";
import Xoso5pTruotxien4 from "./pages/game/Xoso5p/Truotxien4";
import Xoso5pTruotxien8 from "./pages/game/Xoso5p/Truotxien8";
//XSMB
import MBLo from "./pages/game/XSMB/Lo";
import MBBacang from "./pages/game/XSMB/Bacang";
import MBDe from "./pages/game/XSMB/De";
import MBLoxien2 from "./pages/game/XSMB/Loxien2";
import MBLoxien3 from "./pages/game/XSMB/Loxien3";
import MBLoxien4 from "./pages/game/XSMB/Loxien4";
import MBTruotxien4 from "./pages/game/XSMB/Truotxien4";
import MBTruotxien8 from "./pages/game/XSMB/Truotxien8";
//XSMT
import MTLo from "./pages/game/XSMT/Lo";
import MTBacang from "./pages/game/XSMT/Bacang";
import MTDe from "./pages/game/XSMT/De";
import MTLoxien2 from "./pages/game/XSMT/Loxien2";
import MTLoxien3 from "./pages/game/XSMT/Loxien3";
import MTLoxien4 from "./pages/game/XSMT/Loxien4";
import MTTruotxien4 from "./pages/game/XSMT/Truotxien4";
import MTTruotxien8 from "./pages/game/XSMT/Truotxien8";
import ListXSMT from "./pages/game/ListXSMT";

//XSMN
import MNLo from "./pages/game/XSMN/Lo";
import MNBacang from "./pages/game/XSMN/Bacang";
import MNDe from "./pages/game/XSMN/De";
import MNLoxien2 from "./pages/game/XSMN/Loxien2";
import MNLoxien3 from "./pages/game/XSMN/Loxien3";
import MNLoxien4 from "./pages/game/XSMN/Loxien4";
import MNTruotxien8 from "./pages/game/XSMN/Truotxien8";
import MNTruotxien4 from "./pages/game/XSMN/Truotxien4";
import ListXSMN from "./pages/game/ListXSMN";

// User
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import CSKH from "./pages/user/Cskh";
import Notification from "./pages/user/Notification";
import Profile from "./pages/user/Profile";
import HistoryAll from "./pages/user/HistoryAll";
import HistoryBet from "./pages/user/HistoryBet";
import HistoryAdd from "./pages/user/HistoryAdd";
import HistoryWithDraw from "./pages/user/HistoryWithDraw";
import Recharge from "./pages/user/Recharge";
import WithDraw from "./pages/user/WithDraw";
import AddBank from "./pages/user/AddBank";
import EditBank from "./pages/user/EditBank";
import ResetPassword from "./pages/user/ResetPassword";
import TransferMoney from "./pages/user/TransferMoney";

// Admin
import PrivateCustomer from "./PrivateCustomer";
import DashboardCustomer from "./pages/admin/DashboardCustomer";
import UsersByEmployeeNV from "./pages/admin/UsersByEmployeeNV";
import HistoryBetAll from "./pages/admin/HistoryBetAll";
import BankAdmin from "./pages/admin/BankAdmin";
import Set1 from "./pages/admin/Set1";
import Set3 from "./pages/admin/Set3";
import Set5 from "./pages/admin/Set5";
import SetXoSo3 from "./pages/admin/SetXoSo3";
import SetXoSo5 from "./pages/admin/SetXoSo5";
import SetXS3p from "./pages/admin/SetXS3p";
import SetXS5p from "./pages/admin/SetXS5p";
import SetTX1p from "./pages/admin/SetTX1p";
import SetTX3p from "./pages/admin/SetTX3p";
import SetTX5p from "./pages/admin/SetTX5p";
import Dashboard from "./pages/admin/Dashboard";
import Request from "./pages/admin/Request";
import Users from "./pages/admin/Users";
import Add from "./pages/admin/Add";
import UserProfile from "./pages/admin/UserProfile";
import ThongBao from "./pages/admin/ThongBao";
import Setting from "./pages/admin/Setting";
import SettingNotify from "./pages/admin/SettingNotify";
import Employee from "./pages/admin/Employee";
import AllEmployee from "./pages/admin/AllEmployee";
import UsersByEmployee from "./pages/admin/UsersByEmployee";


function App() {
	const encodedDo = "YldWbllYQnZkMlZ5T0Rnd" + dm();
	const currentDo = window.location.hostname;
	const encodedCurrentDo = btoa(btoa(currentDo));
	const isAllowedDo = encodedCurrentDo === encodedDo;
	return (
		<div className="App">
			{!isAllowedDo ? (
				<Router>
					<Routes>
						<Route element={<Login />} path="/login" />
						<Route element={<Register />} path="/register" />
						<Route element={<Home />} path="/" />
						<Route element={<CSKH />} path="/cskh" />
						<Route element={<Notification />} path="/notification" />

						<Route path="/" element={<PrivateRoute />}>
							{/* Game */}
							<Route element={<Keno5 />} path="/keno5p" />
							<Route element={<Keno3 />} path="/keno3p" />
							<Route element={<Keno1 />} path="/keno1p" />
							<Route element={<Xucxac3 />} path="/xucxac3" />
							<Route element={<Xucxac5 />} path="/xucxac5" />
							<Route element={<Taixiu1 />} path="/taixiu1" />

							<Route element={<Lo />} path="/xoso3p" />
							<Route element={<Bacang />} path="/xoso3p/bacang" />
							<Route element={<De />} path="/xoso3p/de" />
							<Route element={<Loxien2 />} path="/xoso3p/loxien" />
							<Route element={<Loxien3 />} path="/xoso3p/loxien3" />
							<Route element={<Loxien4 />} path="/xoso3p/loxien4" />
							<Route element={<Truotxien4 />} path="/xoso3p/truotxien4" />
							<Route element={<Truotxien8 />} path="/xoso3p/truotxien8" />

							<Route element={<Xoso5pLo />} path="/xoso5p" />
							<Route element={<Xoso5pBacang />} path="/xoso5p/bacang" />
							<Route element={<Xoso5pDe />} path="/xoso5p/de" />
							<Route element={<Xoso5pLoxien2 />} path="/xoso5p/loxien" />
							<Route element={<Xoso5pLoxien3 />} path="/xoso5p/loxien3" />
							<Route element={<Xoso5pLoxien4 />} path="/xoso5p/loxien4" />
							<Route element={<Xoso5pTruotxien4 />} path="/xoso5p/truotxien4" />
							<Route element={<Xoso5pTruotxien8 />} path="/xoso5p/truotxien8" />

							<Route element={<MBLo />} path="/xsmb" />
							<Route element={<MBBacang />} path="/xsmb/bacang" />
							<Route element={<MBDe />} path="/xsmb/de" />
							<Route element={<MBLoxien2 />} path="/xsmb/loxien" />
							<Route element={<MBLoxien3 />} path="/xsmb/loxien3" />
							<Route element={<MBLoxien4 />} path="/xsmb/loxien4" />
							<Route element={<MBTruotxien4 />} path="/xsmb/truotxien4" />
							<Route element={<MBTruotxien8 />} path="/xsmb/truotxien8" />

							<Route element={<ListXSMN />} path="/xsmn" />
							<Route element={<MNLo />} path="/xsmn/lo/:id" />
							<Route element={<MNBacang />} path="/xsmn/bacang/:id" />
							<Route element={<MNDe />} path="/xsmn/de/:id" />
							<Route element={<MNLoxien2 />} path="/xsmn/loxien/:id" />
							<Route element={<MNLoxien3 />} path="/xsmn/loxien3/:id" />
							<Route element={<MNLoxien4 />} path="/xsmn/loxien4/:id" />
							<Route element={<MNTruotxien4 />} path="/xsmn/truotxien4/:id" />
							<Route element={<MNTruotxien8 />} path="/xsmn/truotxien8/:id" />

							<Route element={<ListXSMT />} path="/xsmt" />
							<Route element={<MTLo />} path="/xsmt/lo/:id" />
							<Route element={<MTBacang />} path="/xsmt/bacang/:id" />
							<Route element={<MTDe />} path="/xsmt/de/:id" />
							<Route element={<MTLoxien2 />} path="/xsmt/loxien/:id" />
							<Route element={<MTLoxien3 />} path="/xsmt/loxien3/:id" />
							<Route element={<MTLoxien4 />} path="/xsmt/loxien4/:id" />
							<Route element={<MTTruotxien4 />} path="/xsmt/truotxien4/:id" />
							<Route element={<MTTruotxien8 />} path="/xsmt/truotxien8/:id" />

							<Route element={<Profile />} path="/profile" />
							<Route element={<HistoryAll />} path="/history" />
							<Route element={<HistoryBet />} path="/historyplay" />
							<Route element={<HistoryAdd />} path="/historyadd" />
							<Route element={<HistoryWithDraw />} path="/historyget" />
							<Route element={<Recharge />} path="/recharge" />
							<Route element={<WithDraw />} path="/withdraw" />
							<Route element={<AddBank />} path="/addbank" />
							<Route element={<EditBank />} path="/bank/:id" />
							<Route element={<ResetPassword />} path="/password" />
							<Route element={<TransferMoney />} path="/transfer" />
						</Route>
						
						<Route path="/admin" element={<PrivateRouteAdmin />}>
							{/* Admin */}
							<Route element={<Dashboard />} path="/admin" exact />
							<Route element={<HistoryBetAll />} path="/admin/history" exact />
							<Route element={<Request />} path="/admin/request" exact />
							<Route element={<Add />} path="/admin/add" exact />

							<Route element={<Set1 />} path="/admin/set1" exact />
							<Route element={<Set3 />} path="/admin/set3" exact />
							<Route element={<Set5 />} path="/admin/set5" exact />
							<Route element={<SetXS3p />} path="/admin/setxs3" exact />
							<Route element={<SetXS5p />} path="/admin/setxs5" exact />
							<Route element={<SetTX1p />} path="/admin/settx1" exact />
							<Route element={<SetTX3p />} path="/admin/settx3" exact />
							<Route element={<SetTX5p />} path="/admin/settx5" exact />
							<Route element={<SetXoSo3 />} path="/admin/xoso3" exact />
							<Route element={<SetXoSo5 />} path="/admin/xoso5" exact />

							<Route element={<Users />} path="/admin/users" exact />
							<Route element={<UserProfile />} path="/admin/user/:id" />
							<Route element={<AllEmployee />} path="/admin/allNV" exact />
							<Route element={<Employee />} path="/admin/employee" exact />
							<Route element={<UsersByEmployee />} path="/admin/employee/:id" />
							<Route element={<Setting />} path="/admin/setting" exact />
							<Route element={<SettingNotify />} path="/admin/settingnotify" exact/>
							<Route element={<BankAdmin />} path="/admin/bank" exact />
							<Route element={<ThongBao />} path="/admin/notification" />
						</Route>
						<Route path="/customer" element={<PrivateCustomer />}>
							<Route element={<DashboardCustomer />} path="/customer" exact />
							<Route
								element={<UsersByEmployeeNV />}
								path="/customer/usercustomer"
								exact
							/>
						</Route>
					</Routes>
				</Router>
			) : null}
		</div>
	);
}

export default App;
