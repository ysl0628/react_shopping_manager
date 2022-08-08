import React from "react";
import { Menu, Layout } from "antd";
import { adminRoutes } from "../../../routes";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const { Sider } = Layout;

export default function SiderMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();

  // 新版 Menu 的選單已以 items 替代
  function getItem(path, icon, label) {
    return { key: path, icon, label };
  }
  let items = [];
  adminRoutes.forEach((route) => {
    if (!route.isShow) return;
    if (!route.children) {
      items = [...items, getItem(route.path, route.icon, route.title)];
      return;
    }
    route.children.forEach((child) => {
      if (!child.isShow) return;
      items = [...items, getItem(child.path, child.icon, child.title)];
    });
  });
  console.log(items);

  // 設置現在點擊的頁面
  useEffect(() => {
    const currentPath = location.pathname.slice(7);
    setSelectedKey(currentPath);
  }, [location.pathname]);

  const clickHandler = (e) => {
    console.log(e);
    // 轉跳指向
    navigate(`${e.key}`);
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        onClick={clickHandler}
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={[selectedKey]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </Sider>
  );
}
