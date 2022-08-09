import React, { useEffect, useState } from "react";
import { Form, Card, Input, Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../store/api/productsApi";
import { serverUrl } from "../../../utlis/config";
import { useSelector } from "react-redux";
// import axios from "axios";

function Edit() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 取得當前 token 值，才有權限
  const token = useSelector((state) => state.auth.token);
  // 取得 form 的功能 (antd)
  const [form] = Form.useForm();
  // 取得現在網址的 id
  const { id } = useParams();
  // 以現在網址的 id 取得該商品資訊
  const { data: product, isSuccess } = useGetProductByIdQuery(id, {
    skip: !id, // 新增數據時，數據庫並沒有id，故當沒有id時跳過請求
    refetchOnMountOrArgChange: true,
  });
  // const fetchProducts = useGetProductByIdQuery();
  // 調用增加數據的 api
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  // 當數據加載成功再將數據庫中的 name 及 price 顯示至 form 的 input 中
  // const getProductById = async (id) => {
  //   const res = await axios.get(
  //     "http://localhost:1337/api/products/" + id + "?populate=*"
  //   );
  //   console.log(res.data);
  //   let product = res.data.data;
  //   form.setFieldsValue({
  //     name: product.attributes.name,
  //     price: product.attributes.price,
  //   });
  //   // 使 imageUrl 為 true 並傳入圖片網址及 id，且隱藏 uploadButton
  //   if (product.attributes?.image?.data?.attributes?.url) {
  //     setImageUrl(serverUrl + product.attributes?.image?.data?.attributes?.url);
  //     setImageId(product.attributes?.image?.data?.id);
  //   }
  // };
  // useEffect(() => {
  //   getProductById(id);

  // }, []);
  useEffect(() => {
    // 點擊新增時因 isSuccess 為 false 所以不會進行此步驟
    if (isSuccess) {
      form.setFieldsValue({
        name: product.attributes.name,
        price: product.attributes.price,
      });
      // 使 imageUrl 為 true 並傳入圖片網址及 id，且隱藏 uploadButton
      if (product.attributes?.image?.data?.attributes?.url) {
        setImageUrl(
          serverUrl + product.attributes?.image?.data?.attributes?.url
        );
        setImageId(product.attributes?.image?.data?.id);
      }
      console.log(serverUrl + product.attributes?.image?.data?.attributes?.url);
    }
  }, [form, id, isSuccess, product]);

  // 表單送出後新增品項到列表中或修改完成品項
  const onFinish = async (values) => {
    if (id) {
      try {
        // 將修改資訊傳入 localstorage 及 Api 更新方法需傳入一個對象
        const res = await updateProduct({
          id,
          attributes: { ...values, image: imageId },
        });
        // 如果出現錯誤則拋出錯誤並返回
        if (res.error) throw Error(res.error);
        console.log(values);
        message.success("修改成功");
        navigate(-1);
      } catch (err) {
        message.error("請輸入正確內容");
      }
      return;
    }
    try {
      let data = { ...values };
      if (imageId) data.image = imageId;
      // 將新增資訊傳入 localstorage 及 Api
      const res = await addProduct(data);
      // 如果出現錯誤則拋出錯誤並返回
      if (res.error) throw Error(res.error);
      console.log(values);
      message.success("提交成功");
      navigate("/admin/products");
    } catch (err) {
      message.error("請輸入正確內容");
    }
  };

  const onFinishFailed = (err) => message.error(err);
  // 輸入驗證
  const priceValidator = (_, value) => {
    return value * 1 > 1000
      ? Promise.reject(new Error("價錢不可大於1000"))
      : isNaN(value)
      ? Promise.reject(new Error("請輸入數字"))
      : Promise.resolve();
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    console.log("點擊");
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file);
      setImageId(info.file.response[0].id);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Card
      title="商品編輯"
      extra={<Button onClick={() => navigate("/admin/products")}>返回</Button>}
    >
      <Form
        //添加 form 功能
        form={form}
        name="form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="品名"
          name="name"
          rules={[
            {
              required: true,
              message: "請輸入商品名稱",
            },
          ]}
        >
          <Input placeholder="請輸入商品名稱" />
        </Form.Item>
        <Form.Item
          label="價格"
          name="price"
          rules={[
            {
              required: true,
              message: "請輸入商品價格",
            },
            {
              validator: priceValidator,
            },
          ]}
        >
          <Input placeholder="請輸入商品價格" />
        </Form.Item>
        <Form.Item label="圖片">
          <Upload
            name="files"
            listType="picture-card"
            // className="avatar-uploader"
            showUploadList={false}
            action={"/api/upload"}
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            onChange={(info) => handleChange(info)}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="files"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
