import React from "react";
import { Button, Layout, Avatar } from "antd";
import "./index.css";
import { MenuFoldOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Dropdown, theme,Switch } from "antd";
import { useDispatch, useStore } from "react-redux";
import { initMenu, collapseMenu } from "../../store/reducers/tap";
import { useNavigate } from "react-router-dom";
import { useCreateContext } from "../context/context";
const { Header } = Layout;
const { useToken } = theme;
const CommonHeader = ({ collapsed }) => {
  // 修改全局主题
  const { themeColor, setThemeColor } = useCreateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();   //创建useDispatch
  
  const onChange = () => {
    setThemeColor(!themeColor);
  };

  
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
 
  //   定义展开和收起
  const setCollapsed = () => {
    console.log(collapsed);
    dispatch(collapseMenu()); //执行全局修改
  };

  //  backgroundColor: "#000"
  const { token } = useToken();
  return (
    <Header
      className="site-layout-background header-container"
      style={{ padding: "0 12px " }}
    >
      <Button
        onClick={setCollapsed}
        type="text"
        style={{
          fontSize: "16px",
          width: 48,
          height: 32,
          border:`1px solid ${token.colorBorder}`,
          backgroundColor:  token.colorPrimaryBg,
        }}
        icon={<MenuFoldOutlined />}
      ></Button>

      <div className="flex flex-c ai-c">
        <Switch
          onChange={onChange}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
          defaultChecked
          style={{marginRight:12}}
        />
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
      </div>
    </Header>
  );
};

export default CommonHeader;
