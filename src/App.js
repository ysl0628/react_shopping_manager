import React from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import { RouterAll } from "./routes";

function App() {
  return (
    <>
      <RouterAll />
    </>
    // <Routes>
    //   {/* 設置 App 的嵌套 router 需要加 /* 才能進行默認轉跳 */}
    //   <Route path={"admin/*"} element={<AdminPage />}>
    //     {/* 列舉 adminRoutes 的所有組件 */}
    //     {adminRoutes.map((route) => {
    //       return <Route key={route.path} {...route} />;
    //     })}
    //   </Route>
    //   {/* 列舉 mainRoutes 的所有組件 */}
    //   {mainRoutes.map((route) => {
    //     return <Route key={route.path} {...route} />;
    //   })}
    //   {/* 默認路徑 */}
    //   <Route path={"/"} element={<Navigate to="admin" />} />
    //   <Route path={"admin"} element={<Navigate to={adminRoutes[0].path} />} />
    //   {/* 轉跳至 404 頁面 */}
    //   <Route path={"*"} element={<Navigate to="404" />} />
    // </Routes>
  );
}

export default App;
