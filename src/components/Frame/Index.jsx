import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Space, Avatar, message, Badge } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import logo from "./logo.png";
// import { adminRoutes } from "../../routes";
import "./index.css";
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/api/reducer/authSlice";
import SiderMenu from "../Admin/SiderMenu";

const { Header, Content } = Layout;

//#region // const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//     const key = String(index + 1);
//     return {
//         key: `sub${key}`,
//         icon: React.createElement(icon),
//         label: `subnav ${key}`
//     };
// });
// console.log(items2);
//#endregion

function Index(props) {
  const navigate = useNavigate();

  // 使用 useSelector 取得 slice 資訊
  const auth = useSelector((state) => state.auth);
  const isAllRead = useSelector((state) => state.noti.isAllRead);
  const dispatch = useDispatch();

  // 下拉式選單列表
  const items2 = [
    {
      label: "通知中心",
      key: "noti",
    },
    {
      label: `${auth.user.username}`,
      key: "setting",
    },
    {
      type: "divider",
    },
    {
      label: "登出",
      key: "logOut",
    },
  ];

  // 下拉式選單點擊功能
  const userClickHandler = (e) => {
    if (e.key === "logOut") {
      // 點擊後清除 token 紀錄並登出
      dispatch(logout());
      // 登出後轉跳至 login 頁面
      navigate("/login");
      message.info("您已登出！");
      return;
    }
    if (e.key === "noti") {
      navigate("/admin/notices");
    }
  };

  // 製作下拉式選單
  const popMenu = <Menu onClick={userClickHandler} items={items2} />;

  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar icon={<UserOutlined />} />
            <Badge dot={!isAllRead}>
              <Space
                style={{
                  color: "white",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                超級管理員
                <DownOutlined />
              </Space>
            </Badge>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <SiderMenu />
        <Layout
          style={{
            padding: "16px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Index;
