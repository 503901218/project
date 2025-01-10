import { Outlet } from "react-router-dom";
import { Layout, message } from "antd";
import React, { useEffect, createContext, useState } from "react";
// 引入组件
import * as Icon from "@ant-design/icons";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import CommonTag from "../components/commonTag";
import { MyProviderContext } from "../components/context/context";
import RouterAuth from "../router/routeAuth"; //定义路由权限
import { useSelector } from "react-redux"; //useSelector 这个 hooks 让我们的组件从 Redux 的 store 状态树中提取它需要的任何数据。
// import getMenu from "../../config/permission"; //模拟获取路由信息
const { Content } = Layout;

const Main = () => {


  useEffect(() => {
    // console.log('main渲染完成')
  }, []);
  const collapsed = useSelector((state) => state.tab.isCollapse); //collapsed控制菜单展开和收起，同级组件就全局变量控制
  // const [collapsed, setCollapsed] = useState(false);//跨组件通信

  // 接收子组件内容
  const handleDataFromCommonAside = (childdata) => {
    console.log(childdata);
    message.success("子传父 接受到菜单内容" + JSON.stringify(childdata), 2);
  };

  return (
    <RouterAuth>
      {/* //RouterAuth 完成登陆鉴权才能显示内容 */}
      <Layout className="main-container">
        <CommonAside
          onData={handleDataFromCommonAside}
          className="common-aside"
          collapsed={collapsed}
        ></CommonAside>
        <Layout className="site-layout">
          <CommonHeader collapsed={collapsed}></CommonHeader>
          <CommonTag></CommonTag>

          {/* <MyProviderContext> */}
            <Content
              className="site-layout-background"
                style={{
                 
                overflow: "auto",
                margin: "12px 16px",
                padding: 24,
                minHeight: 280,
              }} 
            >
            
              <Outlet /> {/* 子路由出口 */}
          
            </Content>
          {/* </MyProviderContext> */}
        </Layout>
      </Layout>
    </RouterAuth>
  );
};
export default Main;
