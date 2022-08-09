import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import {
  AreaChartOutlined,
  ShopOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import DashboardPage from "../pages/DashboardPage";
import EditPage from "../pages/EditPage";
import NoticePage from "../pages/NoticePage";
import ListPage from "../pages/ListPage";
import { Navigate, useRoutes } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import Order from "../components/Admin/Order";

export const mainRoutes = [
  {
    path: "",
    element: <Navigate to="/admin" />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <PageNotFound />,
  },
];
export const adminRoutes = [
  {
    // /admin -> /admin/dashboard
    path: "",
    element: <AdminPage />,
    isShow: true,
    children: [
      {
        path: "",
        element: <DashboardPage />,
        isShow: true,
        title: "後台管理",
        icon: <AreaChartOutlined />,
      },
      {
        path: "products",
        element: <ListPage />,
        isShow: true,
        title: "商品管理",
        icon: <ShopOutlined />,
      },
      {
        path: "products/create",
        element: <EditPage />,
      },
      {
        path: "products/edit/:id",
        element: <EditPage />,
      },
      {
        path: "notices",
        element: <NoticePage />,
      },
      {
        path: "orders",
        element: <Order />,
        isShow: true,
        title: "訂單管理",
        icon: <FileTextOutlined />,
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  { path: "*", element: <Navigate to="404" /> },
];

export const RouterMain = () => useRoutes(mainRoutes);
export const RouterAdmin = () => useRoutes(adminRoutes);

export const allRoutes = [
  {
    path: "/*",
    element: <RouterMain />,
  },
  {
    path: "/admin/*",
    element: <RouterAdmin />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export const RouterAll = () => useRoutes(allRoutes);

// export const mainRoutes = [
//   {
//     path: "login",
//     element: <LoginPage />,
//   },
//   {
//     path: "404",
//     element: <PageNotFound />,
//   },
// ];

// export const adminRoutes = [
//   {
//     path: "dashboard",
//     element: <DashboardPage />,
//     isShow: true,
//     title: "後台管理",
//     icon: <AreaChartOutlined />,
//   },
//   {
//     path: "products",
//     element: <ListPage />,
//     isShow: true,
//     title: "商品管理",
//     icon: <ShopOutlined />,
//   },
//   {
//     path: "products/edit",
//     element: <EditPage />,
//     isShow: false,
//   },
//   {
//     path: "products/edit/:id",
//     element: <EditPage />,
//     isShow: false,
//   },
//   {
//     path: "notices",
//     element: <NoticePage />,
//     isShow: false,
//   },
// ];
