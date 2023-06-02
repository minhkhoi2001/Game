import React from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const Header = ({ profile }) => {
  const [isShow, setShow] = useState(false);
  return (
    <div className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <img src={require("../../img/logo-vietlott.png")} alt="Logo" />
          </Link>
        </div>
        <div className="header-right">
          <div style={{ display: "flex", float: "right" }}>
            {profile ? (
              <span style={{ marginRight: "0.111rem" }}>
                Số dư: <b>{Math.floor(profile.money).toLocaleString()}đ</b>
              </span>
            ) : (
              <span style={{ marginRight: "0.111rem" }}>
                Số dư: <b>******đ</b>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
