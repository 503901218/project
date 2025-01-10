import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux"; //执行修改仓库数据方法
import { selectMenuList } from "../../store/reducers/tap"; //修改仓库数据
const { Sider } = Layout;

// 动态获取icon，返回react对象
const iconToElement = (name) => React.createElement(Icon[name]);

const CommonAside = ({ collapsed, onData }) => {
  const navigate = useNavigate(); //拿到跳转函数实例
  const action = useLocation(); //获取当前路由信息
  const [list, setList] = useState([]); //获取的菜单列表
  const [items, setItems] = useState([]); //处理后 渲染的菜单items
  const dispatch = useDispatch(); //修改仓库数据钩子

  // 处理菜单数据
  const handelRouterList = (data) => {
    let routerList = data.map((i) => {
      // 没有子菜单
      const child = {
        key: i.path,
        icon: iconToElement(i.icon),
        label: i.label,
        // currentChoose:false,//当前选中
      };
      // 有子菜单
      if (i.children) {
        child.children = i.children.map((item) => {
          return {
            key: item.path,
            label: item.label,
            // currentChoose:false,//当前选中
          };
        });
      }
      return child;
    });
    console.log("items", routerList);
    return routerList;
  };

  //假装获取目录
  const getMenu = (role) => {
    if (role === "admin" || localStorage.getItem("role") === "admin") {
      return [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "HomeOutlined",
          url: "/home/index",
        },
        {
          path: "/mall",
          name: "mall",
          label: "mall页",
          icon: "HomeOutlined",
          url: "/mall/index",
        },
        {
          path: "/user",
          name: "user",
          label: "user页",
          icon: "ShopOutlined",
          url: "/user/index",
        },
        {
          path: "/other",
          label: "其他",
          icon: "SettingOutlined",
          children: [
            {
              path: "/other/pageOne",
              name: "page1",
              label: "page1页",
              icon: "SettingOutlined",
            },
            {
              path: "/other/pageTwo",
              name: "page2",
              label: "page2页",
              icon: "SettingOutlined",
            },
          ],
        },
      ];
    } else if (role === "user" || localStorage.getItem("role") === "user") {
      return [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "HomeOutlined",
          url: "/home/index",
        },

        {
          path: "/user",
          name: "user",
          label: "user页",
          icon: "ShopOutlined",
          url: "/user/index",
        },
        {
          path: "/other",
          label: "其他",
          icon: "SettingOutlined",
          children: [
            {
              path: "/other/pageOne",
              name: "page1",
              label: "page1页",
              icon: "SettingOutlined",
            },
          ],
        },
      ];
    } else {
      return [];
    }
  };
  let menu = useRef("menu");
  // 首次加载
  useEffect(() => {
    setList(getMenu(localStorage.getItem("role")));
    console.log("首次加载", menu);
  }, []);

  // 监听菜单的变化
  useEffect(() => {
    setItems(handelRouterList(list));
  }, [list]);

  // 添加数据到仓库
  const setTabList = (data) => {
    dispatch(
      selectMenuList({
        path: data.path,
        name: data.name,
        label: data.label,
        currentChoose: true, //当前选中
      })
    );
  };

  // 定义点击函数
  const selceMenu = (e) => {
    navigate(e.key); //只有路径，没有名称
    let data;
    console.log("定义点击函数", menu);
    onData(e.key);
    // 菜单过滤
    list.forEach((item) => {
      // 获取第一级菜单，目前最多2级，已经涵盖有子菜单和没有子菜单的情况，
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        if (e.keyPath.length > 1) {
          //获取的第一集菜单，有子菜单，继续向下
          data = item.children.find((child) => {
            return child.path === e.key;
          });
        }
      }
    });
    setTabList(data);
  };

  return (
    // collapsed控制菜单展开和收起
    // 响应式自动收起  breakpoint="md"   collapsedWidth="0" 假如要响应式小于md屏幕 ≥ 768px
    //  自动收起菜单就不能设置collapsed={collapsed}   trigger={null} 这是手动控制
    <Sider
      // breakpoint="sm"
      // collapsedWidth="0"

      collapsed={collapsed}
      trigger={null}
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <h3 className="app-name">{collapsed ? "后台" : "通用后台系统"}</h3>
      <Menu
        ref={menu}
        defaultSelectedKeys={["1"]}
        onClick={selceMenu}
        style={{ height: "100%" }}
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[action.pathname]} //切换tab，菜单响应改变选中高亮 当前选中的菜单项action.pathname=== key 数组
      />
    </Sider>
  );
};
export default CommonAside;
