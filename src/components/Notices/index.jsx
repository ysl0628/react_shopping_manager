import React from "react";
import { Button, Card, List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setReadAll } from "../../store/api/reducer/notiSlice";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function Notices() {
  const dispatch = useDispatch();
  // const readState = useSelector((state) => state.noti.isAllRead);
  return (
    <Card
      title="通知中心"
      extra={<Button onClick={() => dispatch(setReadAll())}>已讀所有</Button>}
    >
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ display: "flex" }}>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
            <Button size="small">已讀</Button>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Notices;
