import * as echarts from "echarts";
import Reactk, { useRef, useEffect } from "react";

const axisOption = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
const normalOption = {
  title: {
    text: "Weather Statistics",
    subtext: "Fake Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    bottom: 10,
    left: "center",
    data: ["CityA", "CityB", "CityD", "CityC", "CityE"],
  },
  series: [
    {
      type: "pie",
      radius: "65%",
      center: ["50%", "50%"],
      selectedMode: "single",
      data: [
        { value: 735, name: "CityC" },
        { value: 510, name: "CityD" },
        { value: 434, name: "CityB" },
        { value: 335, name: "CityA" },
      ],
    },
  ],
};

const MyEcharts = ({ style, chartData }) => {
  const echartsRef = useRef(); //获取dom实例
  let echartsObj = useRef(null); //用于响应式变量，但是不触发页面刷新，普通变量无法响应式
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    echartsObj.current = echarts.init(echartsRef.current);

    // 绘制图表
    echartsObj.current.setOption(chartData);
    
    // 调整图表大小
    const resizeChart = () => {
      if (echartsObj.current) {
        echartsObj.current.resize();
      }
    };

    // 监听窗口大小变化
    window.addEventListener("resize", resizeChart);

    //    window.addEventListener('resize', function() {
    // 当窗口大小发生变化时，调整图表大小
    // echartsObj.resize();
    //   }, [chartData]); //chartData变化的时候更新
  });

  return <div className="echartsRefaa" style={style} ref={echartsRef}></div>;
};
export default MyEcharts;
