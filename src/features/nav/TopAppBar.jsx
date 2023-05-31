import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { signOut } from "../../app/firebase/authService";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

function TopAppBar({ collapsed, onCollapse, width }) {
  return (
    <>
      <Menu
        mode="horizontal"
        style={{
          position: "sticky",
          zIndex: 1,
          width: "100%",
          display: "block",
        }}
      >
        {width < 500 && (
          <Menu.Item key="menu" style={{ backgroundColor: "white" }}>
            {collapsed ? (
              <AiOutlineMenuFold
                size={30}
                style={{ paddingTop: "12px" }}
                onClick={() => onCollapse(!collapsed)}
              />
            ) : (
              <AiOutlineMenuUnfold
                size={30}
                style={{ paddingTop: "12px" }}
                onClick={onCollapse}
              />
            )}
          </Menu.Item>
        )}
        <Menu.Item key="logout" onClick={signOut} style={{ float: "right" }}>
          Logout
        </Menu.Item>
        <Menu.Item key="profile" style={{ float: "right" }}>
          <Link to="/home/myprofile">Profile</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default TopAppBar;
