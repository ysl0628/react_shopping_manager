import React from "react";
import Admin from "../components/Admin/Admin";
import { useSelector } from "react-redux";
import { matchRoutes, Navigate, Outlet, useLocation } from "react-router-dom";
import Frame from "../components/Frame/Index";

export default function AdminPage() {
  const isLogined = useSelector((state) => state.auth.isLogined);
  console.log(isLogined);
  // 判斷是否登錄
  return isLogined ? (
    <Frame className="home">
      {/* 設置 Outlet 才能讀取 index 中的子組件 */}
      <Outlet />
    </Frame>
  ) : (
    /* 為登錄則轉跳至 login */
    <Navigate to={"/login"} />
  );
}
