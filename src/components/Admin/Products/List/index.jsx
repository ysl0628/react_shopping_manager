import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Spin, Image } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDelProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../store/api/productsApi";
import "./index.css";
import { serverUrl } from "../../../../utlis/config";

function List() {
  const navigate = useNavigate();
  // 取得頁數總數
  // const [totalPage, setTotalPage] = useState(0);
  // 取得一個 useSearchParams()，類似 useState
  const [query, setQuery] = useSearchParams();
  // 取得 page 變數
  const page = query.get("page") ?? "1";
  // 使用 useGetProductsQuery() 取得 Api 的商品
  const {
    data: products,
    isSuccess,
    isLoading,
  } = useGetProductsQuery(page, { refetchOnMountOrArgChange: false });
  const [delProduct] = useDelProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  // 導入 Api 中商品，當取得不成功時立即返回
  // 先設置 dataSource 的 useState
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (!isSuccess) return;
    const data = products.data.map((product) => ({
      key: product.id,
      id: product.id,
      name: product.attributes.name,
      price: product.attributes.price,
      onSale: product.attributes.onSale,
      special: product.attributes.special,
      image: product.attributes?.image?.data?.attributes?.formats?.small?.url,
    }));
    setDataSource(data);
    // setTotalPage(products.meta.total);
  }, [isSuccess, products]);

  // 用 setQuery 將點選的 page 頁碼放進 query // 刷新用
  const loadData = (currentPage) => {
    setQuery({ page: currentPage });
  };

  //#region // [
  //   {
  //     key: 1,
  //     name: "檸檬塔",
  //     price: 70,
  //   },
  //   {
  //     key: 2,
  //     name: "巴斯克風焦糖起司蛋糕",
  //     price: 130,
  //   },
  //   {
  //     key: 3,
  //     name: "栗子布蕾焦糖蛋糕",
  //     price: 120,
  //   },
  //   {
  //     key: 4,
  //     name: "芒果香緹布蕾蛋糕",
  //     price: 140,
  //   },
  // ];
  //#endregion

  const columns = [
    {
      title: "編號",
      key: "id",
      width: 80,
      align: "center",
      render: (txt, record, index) => record.id,
    },
    {
      title: "商品名",
      dataIndex: "name",
    },
    {
      title: "價格",
      dataIndex: "price",
    },
    {
      title: "圖片",
      dataIndex: "image",
      render: (txt, record, index) =>
        record.image ? (
          <Image
            style={{ width: "150px" }}
            src={serverUrl + record.image}
            alt={record.name}
          />
        ) : null,
    },
    {
      title: "是否在架上",
      dataIndex: "onSale",
      render: (txt, record, index) => (record.onSale ? "上架中" : "已下架"),
    },
    {
      title: "編輯",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              // 跳轉到 edit 頁面，傳遞 id 作為參數
              onClick={() => {
                console.log(record.image);
                navigate(`/admin/products/edit/${record.id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="確定刪除此商品？"
              onCancel={() => console.log("用戶取消刪除")}
              onConfirm={() => {
                console.log("用戶確認刪除");
                delProduct(record.id);
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                刪除
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                // 修改上架狀態
                updateProduct({
                  id: record.id,
                  attributes: { onSale: !record.onSale },
                });
              }}
            >
              {record.onSale ? "下架" : "上架"}
            </Button>
            <Button
              style={{ margin: "0 1rem" }}
              size="small"
              onClick={() => {
                console.log(record);
                // 修改上架狀態
                updateProduct({
                  id: record.id,
                  attributes: { special: !record.special },
                });
              }}
            >
              {record.special ? "非精選" : "精選"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card
      title="商品列表"
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/admin/products/create")}
        >
          新增
        </Button>
      }
    >
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin tip="數據加載中..." />
        </div>
      ) : (
        <Table
          pagination={{
            total: products.meta.total,
            defaultPageSize: 3,
            onChange: loadData,
          }}
          rowClassName={(record) => (record.onSale ? "" : "bg-red")}
          columns={columns}
          bordered
          dataSource={dataSource}
        />
      )}
    </Card>
  );
}

export default List;
