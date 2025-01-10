import React from "react";
import { Button, Layout, Avatar } from "antd";
import "./index.css";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useDispatch, useStore } from "react-redux";
import { initMenu, collapseMenu } from "../../store/reducers/tap";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate();
  // 退出
  const layout = () => {
    // 清除 登陆token 时间戳
    localStorage.clear("token");
    localStorage.clear("timeout");
    localStorage.clear("role");

    dispatch(initMenu()); //清除选中tab
    navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" onClick={() => layout()} rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];
  //创建useDispatch
  const dispatch = useDispatch();
  //   定义展开和收起
  const setCollapsed = () => {
    console.log(collapsed);
    dispatch(collapseMenu()); //执行全局修改
  };

  return (
    <Header
      className="site-layout-background header-container"
      style={{ padding: "0 30px", backgroundColor: "#000" }}
    >
      <Button
        onClick={setCollapsed}
        type="text"
        style={{
          fontSize: "16px",
          width: 48,
          height: 32,
          backgroundColor: "#fff",
        }}
        icon={<MenuFoldOutlined />}
      ></Button>

      <Dropdown
        menu={{
          items,
        }}
      >
        {/* 头像 */}
        <Avatar
          size="36"
          src={<img src={require("../../assets/images/user.png")}></img>}
        />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
