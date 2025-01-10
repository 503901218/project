import React from "react";
import { Tag, Space } from "antd";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux"; //访问使用仓库数据
import { selectMenuList, closeTag } from "../../store/reducers/tap";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const CommonTag = () => {
  const navigate = useNavigate(); //拿到跳转函数实例
  const tabList = useSelector((state) => state.tab.tabList); //获取仓库数据
  console.log(tabList)
  const dispatch = useDispatch(); //修改仓库数据钩子
  const action = useLocation(); //获取当前路由信息

  //   关闭tag
  const handelClose = (item, index) => {
    dispatch(closeTag(item));
    let length = tabList.length - 1;//剩余tab数量
    // 关闭的不是当前tag
    if (item.path !== action.pathname) {
      return;
    }

    if (length > 0) {
      if (index === length) {
        //最后一个
        navigate(tabList[index - 1].path);
      } else {
        if (tabList.length > 1) {
          navigate(tabList[index + 1].path);
        }
      }
    }else{//全删除，返回首页
        navigate('/home')
    }

  };
  //   切换tag
  const handleCilck = (item, index) => {

    navigate(item.path); //只有路径，没有名称

    dispatch(selectMenuList(item));
  };

  const setTab = (item, index) => {
    return (
        
      <Tag
        color={item.currentChoose ? "#1677ff" : ""}
        key={item.path}
        closable
        onClick={() => handleCilck(item, index)}
        onClose={() => handelClose(item, index)}
      >
        {item.name}
      </Tag>
    );
  };
  return (
    // 只有一个tag而且为首页就不显示
    <Space style={tabList.length===1&&tabList[0].path==='/home'?{display:'none'}:''} className="common-tag" size={[0, 8]} wrap>
      {tabList.map((item, index) => setTab(item, index))}
  </Space>
  );
};
export default CommonTag;
