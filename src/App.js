import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Coundown } from "./pages/admin/Test";


import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import CSKH from "./pages/user/Cskh";
import Notification from "./pages/user/Notification";

import Bet from "./pages/bet/Bet";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import Set5 from "./pages/admin/Set5";
import Request from "./pages/admin/Request";
import Users from "./pages/admin/Users";
import Add from "./pages/admin/Add";
import Trend from "./pages/bet/Trend";

import PrivateRouteAdmin from "./PrivateRouteAdmin";

import UserProfile from "./pages/admin/UserProfile";


import ThongBao from "./pages/admin/ThongBao";
import Trend5 from "./pages/bet/Trend copy 2";
import Trend1 from "./pages/bet/Trend copy";

import Setting from "./pages/admin/Setting";
import Employee from "./pages/admin/Employee";
import AllEmployee from "./pages/admin/AllEmployee";
import UsersByEmployee from "./pages/admin/UsersByEmployee";
import Xoso from "./pages/game/Xoso";
import Set1 from "./pages/admin/Set1";
import Set3 from "./pages/admin/Set3";


// Game
import Keno1 from "./pages/game/Keno1";
import Keno3 from "./pages/game/Keno3";
import Keno5 from "./pages/game/Keno5";
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
						<Route element={<Xoso />} path="/xoso" />
						<Route element={<Xoso />} path="/xoso/bacang" />
						<Route element={<Xoso />} path="/xoso/de" />
						<Route element={<Xoso />} path="/xoso/loxien" />
						<Route element={<Xoso />} path="/xoso/loxien3" />
						<Route element={<Xoso />} path="/xoso/loxien4" />
						<Route element={<Bet />} path="/bet" />
						<Route element={<Trend />} path="/trend" />
						<Route element={<Trend1 />} path="/trend1" />
						<Route element={<Trend5 />} path="/trend5" />

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
						<Route element={<Set5 />} path="/admin/set5" exact />

						<Route element={<Users />} path="/admin/users" exact />
						<Route element={<UserProfile />} path="/admin/user/:id" />

						<Route element={<AllEmployee />} path="/admin/allNV" exact />
						<Route element={<Employee />} path="/admin/employee" exact />
						<Route element={<UsersByEmployee />} path="/admin/employee/:id" />

						<Route element={<Setting />} path="/admin/setting" exact />
						<Route element={<ThongBao />} path="/admin/notification" />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
