import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "../src/app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.Suspense fallback={<div className="admin-theme">Loading...</div>}>
            <App />
        </React.Suspense>
    </Provider>
);
reportWebVitals();