// import logo from './logo.svg';
import "./App.scss";
import "./static/common.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Grid, Tag } from "antd";
import { ConfigProvider, theme, Button } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import React from "react";

import { useCreateContext } from "./components/context/context";

const { useBreakpoint } = Grid;
const { useToken } = theme;
function App() {
  const { themeColor } = useCreateContext();
  const { token } = useToken();
  const screens = useBreakpoint(); //展示当前屏幕是什么尺寸
  return (
    <div className="app">
      <ConfigProvider
        locale={zhCN}
        // 全局样式设置参考https://blog.csdn.net/qq_60178319/article/details/133684416
        theme={{
          // 1. 单独使用暗色算法
          algorithm: themeColor ? "" : theme.darkAlgorithm,
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm], //theme.darkAlgorithm,
          token: {
            // colorPrimary: primary,
          },
          // token: {
          //   colorPrimary: "#00a2fb",
          //   borderRadius: 6,
          //   colorBgContainer: "rgba(7, 59, 108,.6)",
          // },
          // components: {
          //   Select: {
          //     colorText: "#fff",
          //     controlItemBgActive: "rgba(0, 174, 255,.6)", //激活下的颜色
          //     controlItemBgHover: "rgb(11, 73, 127)", //悬浮时的背景颜色
          //     colorBorder: "#00AEFF", //边框颜色
          //     colorBgElevated: "rgba(7, 59, 108,.4)", //浮层容器背景色
          //     controlOutlineWidth: 0, //空白
          //     colorTextQuaternary: "#fff", //按钮颜色
          //     colorTextPlaceholder: "#fff", //控制占位文本的颜色
          //     controlHeight: 28,
          //   },
          // },
        }}
      >
        {/* 而RouterProvider组件则负责将这个路由实例注入到React组件树中，从而使得整个React应用都能访问和使用这些路由 */}
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
