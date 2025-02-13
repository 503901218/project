import React, { useEffect, useState, useRef } from "react";
import WebSocketService from "../../api/websocket";
import MyEcharts from "../../components/echarts";

const webSocketUrl = "ws://127.0.0.1:8082"; // 替换为你的WebSocket服务器URL
const Home = () => {
  // echarts饼图数据
  let chartData = {
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  const [chartDataInfo, setChartDataInfo] = useState(chartData); //chartData3
  const [messages, setMessages] = useState([]);
  const wsServiceRef = useRef(null); // 使用 useRef 来持有 WebSocketService 实例
  useEffect(() => {
    wsServiceRef.current = new WebSocketService(webSocketUrl);
    wsServiceRef.current.connect();

    // 处理接收到的消息
    const handleMessage = (message) => {
      console.log(message, JSON.parse(message));
      if (JSON.parse(message).type === "message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message).msg,
        ]);
      } else {
        setChartDataInfo(JSON.parse(message).data);
      }

    };

   //  wsServiceRef.current.socket.onmessage你可以在这里处理从服务器接收到的消息，比如更新组件状态
    wsServiceRef.current.socket.onmessage = (event) =>
      handleMessage(event.data);

    // 清理函数，组件卸载时关闭WebSocket连接
    return () => {
      if (wsServiceRef.current) {
        wsServiceRef.current.close();
      }
    };
  }, [webSocketUrl]); // 依赖项数组只包含 webSocketUrl

  //   输入内容传回服务器
  const sendMessage = (event) => {
    event.preventDefault(); //阻止表单的默认提交行为
    const input = event.target.elements.messageInput; //从触发事件的目标元素（event.target）中获取名为 messageInput 的表单元素
    const wsService = wsServiceRef.current;

    // 检查 WebSocket 实例是否存在且连接已打开
    if (
      wsService &&
      wsService.socket &&
      wsService.socket.readyState === WebSocket.OPEN
    ) {
      wsService.sendMessage(input.value);
    } else {
      console.error("WebSocket is not ready to send messages.");
    }

    input.value = ""; // 清空输入框
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input type="text" name="messageInput" placeholder="Send a message" />
        <button type="submit">Send</button>
      </form>
      <div className="graph-two flex ai-c jc-sb">
        {chartDataInfo && (
          <MyEcharts
            style={{ width: "50%", height: "260px" }}
            chartData={chartDataInfo}
          ></MyEcharts>
        )}
      </div>
    </div>
  );
};
export default Home;
