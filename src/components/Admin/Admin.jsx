import React from "react";
import { matchRoutes, Navigate, Outlet, useLocation } from "react-router-dom";
import Frame from "../Frame/Index";
import { useSelector } from "react-redux";

function Admin() {
  // 藉由 useSelector 取得登入狀態
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

export default Admin;
