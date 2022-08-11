import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

function Dashboard() {
  console.log(process.env.NODE_ENV);
  return (
    <Card title="數據分析">
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="新增用戶">
              <Statistic
                title="新增用戶"
                value={11}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="人"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="總用戶">
              <Statistic
                title="總用戶"
                value={7304}
                precision={0}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="人"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="今日訂單">
              <Statistic
                title="今日訂單"
                value={23}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="筆"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default Dashboard;
