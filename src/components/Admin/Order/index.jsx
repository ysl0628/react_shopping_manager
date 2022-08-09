import { DownOutlined } from "@ant-design/icons";
import {
  Badge,
  Dropdown,
  Menu,
  Space,
  Table,
  Popconfirm,
  Spin,
  Modal,
} from "antd";
import {
  useDelOrderMutation,
  useGetOrderQuery,
} from "../../../store/api/orderApi";
import React, { useEffect, useState } from "react";
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Action 1",
      },
      {
        key: "2",
        label: "Action 2",
      },
    ]}
  />
);

export default function Order() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("是否確定出貨？");
  const { data: orders, isSuccess, isLoading } = useGetOrderQuery();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!isSuccess) return;
    const orderData = orders.map((order) => ({
      key: "_" + order.id,
      orderId: order.id,
      username: order.attributes.user.data.attributes.username,
      email: order.attributes.email,
      status: order.attributes.status ? "已付款" : "尚未付款",
      createdAt: order.attributes.createdAt.slice(0, 10),
      address: order.attributes.address,
      phone: order.attributes.phone,
      totalPrice: order.attributes.total_price,
      products: order.attributes.products,
    }));
    setData(orderData);
  }, [isSuccess, orders]);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "商品名稱",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "商品數量",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "商品單價",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "商品總價",
        dataIndex: "productTotalPrice",
        key: "productTotalPrice",
      },
      // {
      //   title: "Status",
      //   key: "state",
      //   render: () => (
      //     <span>
      //       <Badge status="success" />
      //       Finished
      //     </span>
      //   ),
      // },

      // {
      //   title: "Action",
      //   dataIndex: "operation",
      //   key: "operation",
      //   render: () => (
      //     <Space size="middle">
      //       <a>Pause</a>
      //       <a>Stop</a>
      //       <Dropdown overlay={menu}>
      //         <a>
      //           More <DownOutlined />
      //         </a>
      //       </Dropdown>
      //     </Space>
      //   ),
      // },
    ];

    const data = [];
    record.products.data.forEach((product, index) => {
      data.push({
        key: "__" + index + 1,
        title: product.attributes.title,
        amount: product.attributes.amount + " 個",
        price: product.attributes.price + " 元",
        productTotalPrice:
          product.attributes.amount * product.attributes.price + " 元",
      });
    });

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("準備出貨中");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const columns = [
    {
      title: "訂單編號",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "訂購會員",
      dataIndex: "username",
      key: "username",
      filters: [
        {
          text: "ysl0628",
          value: "ysl0628",
        },
        {
          text: "admin",
          value: "admin",
        },
      ],
      ffilterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.username.startsWith(value),
      width: "10%",
    },
    {
      title: "訂單成立日期",
      dataIndex: "createdAt",
      key: "createdAt",
      filters: [
        {
          text: "2022-07",
          value: "2022-07",
        },
        {
          text: "2022-08",
          value: "2022-08",
        },
      ],
      ffilterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.createdAt.startsWith(value),
      width: "15%",
    },
    {
      title: "付款狀態",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "聯絡電話",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "配送地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "訂單金額",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "編輯",
      key: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <a href="#!" onClick={showModal}>
              出貨
            </a>
            <Modal
              title="請確認"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
          </>
        ) : null,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin tip="數據加載中..." />
        </div>
      ) : (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: [""],
          }}
          dataSource={data}
          onChange={handleChange}
        />
      )}
    </>
  );
}
