import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBookReader, FaLaptopCode } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const NavMenu = () => {
  const { Item } = Menu;

  return (
    <Menu mode="inline" defaultSelectedKeys={["logo"]}>
      <Item key="logo" icon={<MdDashboard />}>
        <Link to="/home" replace>
          Nova Admin
        </Link>
      </Item>
      <Item key="onlineClasses" icon={<SiGoogleclassroom />}>
        <Link to="/home/onlineClasses">Online Classes</Link>
      </Item>

      <Item key="ide" icon={<AiOutlineCodeSandbox />}>
        <Link to="/home/ide">Code Editor</Link>
      </Item>

      <Item key="codetask" icon={<FaLaptopCode />}>
        <Link to="/home/test">Coding Test</Link>
      </Item>
      <Item key="resources" icon={<FaBookReader />}>
        <Link to="/home/resources">Study Material</Link>
      </Item>
    </Menu>
  );
};

export default NavMenu;
