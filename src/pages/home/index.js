import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card, Table, Grid, Tag } from "antd";

import "./home.scss";
import api,{getLeftList} from "../../api";
import * as Icon from "@ant-design/icons";
import * as echarts from "echarts";
import MyEcharts from "../../components/echarts";
import { chartData, chartData2, chartData3 } from "../../config";
import { useLocation } from "react-router-dom";

const { useBreakpoint } = Grid;

const Home = () => {
 
  const screens = useBreakpoint();//展示当前屏幕是什么尺寸
  // 所有动态数据需要state实现
  // 定义table数据
  const [tableData, setTableData] = useState([]);
  const [chartData11, setChartData] = useState(chartData);
  const [chartData22, setChartData2] = useState(chartData2);
  const [chartData33, setChartData3] = useState(chartData3);
  // const action = useLocation(); //获取当前路由信息

  //useEffect 1、初始化页面时 只执行第一次,
  // 2若依赖项数组不为空，则依赖项变化时候执行use effect函数
  // 3、不传入依赖项数组，每次更新都执行
  useEffect(() => {
    //dom渲染完成

   //假装请求函数
    // api.getLeftList()
    // getLeftList().then((res) => {
    //   // console.log("api.useEffect", res);
    //   const data = [
    //     {
    //       key: "1",
    //       name: "John Brown",
    //       age: 32,
    //       address: "New York No. 1 Lake Park",
    //     },
    //     {
    //       key: "2",
    //       name: "Jim Green",
    //       age: 42,
    //       address: "London No. 1 Lake Park",
    //     },
    //     {
    //       key: "3",
    //       name: "Joe Black",
    //       age: 32,
    //       address: "Sidney No. 1 Lake Park",
    //     },
    //     {
    //       key: "4",
    //       name: "Jim Red",
    //       age: 32,
    //       address: "London No. 2 Lake Park",
    //     },
    //   ];
    //   setTableData(data);
    //   setChartData(chartData);
    //   setChartData2(chartData2);
    //   setChartData3(chartData3);
    // });
    api.getTest('2222')
  }, []);
  // 监听tableData的变化
  useEffect(() => {
    // console.log(" 监听tableData的变化:", tableData);
  }, [tableData]);

  // 监听echartDatas的变化
  useEffect(() => {}, [chartData]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  // 订单数据
  const countData = [
    {
      name: "今日收藏数量1",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#ecd2ec",
    },
    {
      name: "今日收藏数量2",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#d3d3d3",
    },
    {
      name: "今日收藏数量3",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#c6d3e8",
    },
    {
      name: "今日收藏数量4",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#ffface",
    },
    {
      name: "今日收藏数量5",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#8fc1b3",
    },
    {
      name: "今日收藏数量6",
      value: 2413,
      icon: "HighlightOutlined",
      color: "#ffface",
    },
  ];
  // 动态获取icon，返回react对象
  const iconToElement = (name) => React.createElement(Icon[name]);

  // 图片使用引入方式避免打包出错
  const userImg = require("../../assets/images/user.png");
  return (
    <div>
      {/* 展示当前屏幕是什么尺寸 */}
      <>
        Current break point:{" "}
        {Object.entries(screens)
          .filter((screen) => !!screen[1])
          .map((screen) => (
            <Tag color="blue" key={screen[0]}>
              {screen[0]}
            </Tag>
          ))}
      </>
      {/* <Button type="primary">Primary Button</Button> */}
      <Row className="home" wrap>
        {/* // xs 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
// sm 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
// md 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
// lg 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
// xl 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 number | object -
// xxl 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */}
        <Col className="col-one" xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card hoverable>
            <div className="user flex ai-c">
              <img src={userImg} />
              <div className="userinfo">
                <p className="name">Admin</p>
                <p className="access">管理员</p>
              </div>
            </div>
            <div className="login-info ">
              <p className="">
                上次登陆时间<span className="">123</span>
              </p>
              <p className="">
                上次登陆时间<span className="">123</span>
              </p>
            </div>
          </Card>
          <Card hoverable>
            {/* dataSource={tableData}  */}
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            ></Table>
          </Card>
        </Col>

        <Col className="col-two" xs={24} sm={24} md={24} lg={16} xl={16}>
          <div className="nums flex flex-warp">
            {countData.map((item, index) => {
              return (
                <Card key={index} className="flex flex-c ">
                  <div
                    className="icon-box"
                    style={{ backgroundColor: item.color }}
                  >
                    {iconToElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="num">${item.value}</p>
                    <p className="name">{item.name}</p>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* style={{ height: "400px" }} */}
          <div>
            <div className="grapg-one">
              {chartData11 && <MyEcharts chartData={chartData11}></MyEcharts>}
            </div>

            <div className="graph-two flex ai-c jc-sb">
              {chartData22 && <MyEcharts chartData={chartData22}></MyEcharts>}
              {/* style={{ width: "50%", height: "260px" }} */}
              {chartData33 && <MyEcharts chartData={chartData33}></MyEcharts>}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
