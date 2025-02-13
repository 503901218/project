import * as echarts from "echarts";
import Reactk, { useRef, useEffect } from "react";
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
  });

  return <div className="echartsRefaa" style={style} ref={echartsRef}></div>;
};
export default MyEcharts;
