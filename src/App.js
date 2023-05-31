import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PrivateRouteAdmin from "./PrivateRouteAdmin";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import CSKH from "./pages/user/Cskh";
import Notification from "./pages/user/Notification";

// Game
import Keno1 from "./pages/game/Keno/Keno1";
import Keno3 from "./pages/game/Keno/Keno3";
import Keno5 from "./pages/game/Keno/Keno5";
import Xucxac3 from "./pages/game/Xucxac/Xucxac3";

// XS Nhanh
import Lo from "./pages/game/Xoso3p/Lo";
import Bacang from "./pages/game/Xoso3p/Bacang";
import De from "./pages/game/Xoso3p/De";
import Loxien2 from "./pages/game/Xoso3p/Loxien2";
import Loxien3 from "./pages/game/Xoso3p/Loxien3";
import Loxien4 from "./pages/game/Xoso3p/Loxien4";


//xs 5p 
import Xoso5pLo from "./pages/game/Xoso5p/Lo";
import Xoso5pBacang from "./pages/game/Xoso5p/Bacang";
import Xoso5pDe from "./pages/game/Xoso5p/De";
import Xoso5pLoxien2 from "./pages/game/Xoso5p/Loxien2";
import Xoso5pLoxien3 from "./pages/game/Xoso5p/Loxien3";
import Xoso5pLoxien4 from "./pages/game/Xoso5p/Loxien4";

//XSMB
import MBLo from "./pages/game/XSMB/Lo";
import MBBacang from "./pages/game/XSMB/Bacang";
import MBDe from "./pages/game/XSMB/De";
import MBLoxien2 from "./pages/game/XSMB/Loxien2";
import MBLoxien3 from "./pages/game/XSMB/Loxien3";
import MBLoxien4 from "./pages/game/XSMB/Loxien4";

//XSMT
import MTLo from "./pages/game/XSMT/Lo";
import MTBacang from "./pages/game/XSMT/Bacang";
import MTDe from "./pages/game/XSMT/De";
import MTLoxien2 from "./pages/game/XSMT/Loxien2";
import MTLoxien3 from "./pages/game/XSMT/Loxien3";
import MTLoxien4 from "./pages/game/XSMT/Loxien4";

//XSMN
import MNLo from "./pages/game/XSMN/Lo";
import MNBacang from "./pages/game/XSMN/Bacang";
import MNDe from "./pages/game/XSMN/De";
import MNLoxien2 from "./pages/game/XSMN/Loxien2";
import MNLoxien3 from "./pages/game/XSMN/Loxien3";
import MNLoxien4 from "./pages/game/XSMN/Loxien4";

// User
import Profile from "./pages/user/Profile";
import HistoryAll from "./pages/user/HistoryAll";
import HistoryBet from "./pages/user/HistoryBet";
import HistoryAdd from "./pages/user/HistoryAdd";
import HistoryWithDraw from "./pages/user/HistoryWithDraw";
import AddMoney from "./pages/user/AddMoney";
import WithDraw from "./pages/user/WithDraw";
import AddBank from "./pages/user/AddBank";
import EditBank from "./pages/user/EditBank";
import ResetPassword from "./pages/user/ResetPassword";
// Admin
import HistoryBetAll from "./pages/admin/HistoryBetAll";
import PrivateCustomer from "./PrivateCustomer";
import DashboardCustomer from "./pages/admin/DashboardCustomer";
import UsersByEmployeeNV from "./pages/admin/UsersByEmployeeNV";
import BankAdmin from "./pages/admin/BankAdmin";
import Set1 from "./pages/admin/Set1";
import Set5 from "./pages/admin/Set5";
import Set3 from "./pages/admin/Set3";
import SetXoSo from "./pages/admin/SetXoSo";
import Dashboard from "./pages/admin/Dashboard";
import Request from "./pages/admin/Request";
import Users from "./pages/admin/Users";
import Add from "./pages/admin/Add";
import UserProfile from "./pages/admin/UserProfile";
import ThongBao from "./pages/admin/ThongBao";
import Setting from "./pages/admin/Setting";
import Employee from "./pages/admin/Employee";
import AllEmployee from "./pages/admin/AllEmployee";
import UsersByEmployee from "./pages/admin/UsersByEmployee";
import SetXoSo5 from "./pages/admin/SetXoSo5";
import SetXS3p from "./pages/admin/SetXS3p";
import Xucxac5 from "./pages/game/Xucxac/Xucxac5";
import SetXS5p from "./pages/admin/SetXS5p";

function App() {
	return (
		<div className="App">
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
						<Route element={<Xucxac3 />} path="/xucxac" />
						<Route element={<Xucxac5 />} path="/xucxac5" />
						<Route element={<Lo />} path="/xoso3p" />
						<Route element={<Bacang />} path="/xoso3p/bacang" />
						<Route element={<De />} path="/xoso3p/de" />
						<Route element={<Loxien2 />} path="/xoso3p/loxien" />
						<Route element={<Loxien3 />} path="/xoso3p/loxien3" />
						<Route element={<Loxien4 />} path="/xoso3p/loxien4" />

						<Route element={<Xoso5pLo />} path="/xoso5p" />
						<Route element={<Xoso5pBacang />} path="/xoso5p/bacang" />
						<Route element={<Xoso5pDe />} path="/xoso5p/de" />
						<Route element={<Xoso5pLoxien2 />} path="/xoso5p/loxien" />
						<Route element={<Xoso5pLoxien3 />} path="/xoso5p/loxien3" />
						<Route element={<Xoso5pLoxien4 />} path="/xoso5p/loxien4" />

						<Route element={<MBLo />} path="/xsmb" />
						<Route element={<MBBacang />} path="/xsmb/bacang" />
						<Route element={<MBDe />} path="/xsmb/de" />
						<Route element={<MBLoxien2 />} path="/xsmb/loxien" />
						<Route element={<MBLoxien3 />} path="/xsmb/loxien3" />
						<Route element={<MBLoxien4 />} path="/xsmb/loxien4" />

						{/*<Route element={<MTLo />} path="/xsmt" />
						<Route element={<MTBacang />} path="/xsmt/bacang" />
						<Route element={<MTDe />} path="/xsmt/de" />
						<Route element={<MTLoxien2 />} path="/xsmt/loxien" />
						<Route element={<MTLoxien3 />} path="/xsmt/loxien3" />
						<Route element={<MTLoxien4 />} path="/xsmt/loxien4" />
						
						<Route element={<MNLo />} path="/xsmn" />
						<Route element={<MNBacang />} path="/xsmn/bacang" />
						<Route element={<MNDe />} path="/xsmn/de" />
						<Route element={<MNLoxien2 />} path="/xsmn/loxien" />
						<Route element={<MNLoxien3 />} path="/xsmn/loxien3" />
						<Route element={<MNLoxien4 />} path="/xsmn/loxien4" />*/}

						{/* User */}
						<Route element={<Profile />} path="/profile" />
						<Route element={<HistoryAll />} path="/history" />
						<Route element={<HistoryBet />} path="/historyplay" />
						<Route element={<HistoryAdd />} path="/historyadd" />
						<Route element={<HistoryWithDraw />} path="/historyget" />
						<Route element={<AddMoney />} path="/addmoney" />
						<Route element={<WithDraw />} path="/withdraw" />
						<Route element={<AddBank />} path="/addbank" />
						<Route element={<EditBank />} path="/bank/:id" />
						<Route element={<ResetPassword />} path="/password" />

					</Route>
					<Route path="/admin" element={<PrivateRouteAdmin />}>
						{/* Admin */}
						<Route element={<Dashboard />} path="/admin" exact />
						<Route element={<HistoryBetAll />} path="/admin/history" exact />
						<Route element={<Request />} path="/admin/request" exact />
						<Route element={<Add />} path="/admin/add" exact />

						<Route element={<Set1 />} path="/admin/set1" exact />
						<Route element={<Set3 />} path="/admin/set3" exact />
						<Route element={<SetXS3p/>} path="/admin/setxs3" exact />
						<Route element={<SetXS5p/>} path="/admin/setxs5" exact />
						<Route element={<Set5 />} path="/admin/set5" exact />
						<Route element={<SetXoSo />} path="/admin/xoso" exact />
						<Route element={<SetXoSo5 />} path="/admin/xoso5" exact />
						<Route element={<Users />} path="/admin/users" exact />
						<Route element={<UserProfile />} path="/admin/user/:id" />

						<Route element={<AllEmployee />} path="/admin/allNV" exact />
						<Route element={<Employee />} path="/admin/employee" exact />
						<Route element={<UsersByEmployee />} path="/admin/employee/:id" />

						<Route element={<Setting />} path="/admin/setting" exact />
						<Route element={<BankAdmin />} path="/admin/bank" exact />
						<Route element={<ThongBao />} path="/admin/notification" />
					</Route>
					<Route path="/customer" element={<PrivateCustomer />}>
						<Route element={<DashboardCustomer />} path="/customer" exact />
						<Route element={<UsersByEmployeeNV />} path="/customer/usercustomer" exact />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
