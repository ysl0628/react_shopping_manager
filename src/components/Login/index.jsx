import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Card } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/api/authApi";
import { login } from "../../store/api/reducer/authSlice";

function Login() {
  const [loginFn] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 設置登入驗證
  const onFinish = async (values) => {
    try {
      // 將登入資訊傳入 localstorage 及 Api
      const res = await loginFn({
        identifier: values.username,
        password: values.password,
      });
      console.log(res);
      // 如果出現錯誤則拋出錯誤並返回
      if (res.error) throw Error(res.error);
      // 登錄成功後，需向系統中添加一個記號，標記用戶的登錄狀態
      dispatch(
        login({
          token: res.data.jwt,
          user: res.data.user,
        })
      );
      message.success("登入成功");
      // 跳轉頁面到登錄之前的目錄
      navigate("/admin");
    } catch (err) {
      message.error("登入失敗！請重新輸入帳號密碼");
    }
  };

  return (
    <Card title="後台管理登入頁面" className="login-form">
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "請輸入帳號!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="帳號"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "請輸入密碼!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密碼"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>記住我</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登錄
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
