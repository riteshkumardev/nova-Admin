import { Layout } from "antd";
import React, { useState } from "react";
import NavMenu from "./NavMenu";

function SideBar() {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider
      width={200}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <NavMenu />
    </Sider>
  );
}

export default SideBar;
