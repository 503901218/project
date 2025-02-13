// src/webSocketService.js

class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
  }
  ModeCode = {
    MSG: "message", //普通消息
    HEART_BEAT: "heart_beat", //心跳检测消息
  };
  webSocketState = false; //连接状态
  heartBeat = {
    time: 5000, //心跳检测时间
    reconnection: 10000, //断线重连时间
    timeout: 3000, //延时等待时间 心跳超时间隔
    times: 1, //重连次数,最多5次
  };
  reconnectionTimer = null; //重连定时器对象

  //   连接websocket
  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      //   开始心跳检测  不调用这个方法就是不进行心跳检测，发送信息依然可以
      this.startHeartBeatFun();

      console.log("WebSocket 连接！");
    };

    // 这里的处理函数在indext页面重写了，为了给饼图赋值，在注释了indext.js的 wsServiceRef.current.socket.onmessage这里才会执行
    this.socket.onmessage = (event) => {
      // 你可以在这里处理接收到的消息，比如更新组件状态
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      switch (data.type) {
        case this.ModeCode.MSG: {
          console.log("普通消息", data);
          break;
        }
        case this.ModeCode.HEART_BEAT: {
          this.webSocketState = true;
          console.log("心跳", data);
          break;
        }
        default: {
          console.log("其他消息", data);
        }
      }
    };

    this.socket.onclose = () => {
      this.webSocketState = false;
      console.log("WebSocket connection 关闭");
    };

    this.socket.onerror = (error) => {
      console.log("发生错误");
      this.webSocketState = false;
      //   重连
      this.reconnectionWebSocket();
      console.error("WebSocket error:", error);
    };
  }
  // 发送信息给服务器
  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      //   this.socket.send(message);
      this.socket.send(
        JSON.stringify({
          ModeCode: this.ModeCode.MSG,
          msg: message,
        })
      );
    } else {
      console.error(
        "WebSocket is not open. Ready state:",
        this.socket ? this.socket.readyState : "No socket"
      );
    }
  }
  //   开始心跳检测连接
  startHeartBeatFun() {
    if (this.heartBeat && this.heartBeat.time) {
      this.webSocketState = true; //连接
      this.startHeartBeat(this.heartBeat.time);
    }
  }
  //   定期心跳检测方法
  startHeartBeat(time) {
    console.log("startHeartBeat");
    setTimeout(() => {
      this.socket.send(
        JSON.stringify({
          ModeCode: this.ModeCode.HEART_BEAT,
          msg: new Date(),
        })
      );
      this.waitingServer(); //延时等待服务端响应，判断webSocketState 是否连线成功
    }, time);
  }
  // 延时等待服务端响应，判断webSocketState 是否连线成功
  waitingServer() {
    // this.webSocketState = false;
    console.log("延时等待服务端响应waitingServer");
    setTimeout(() => {
      console.log(
        "延时等待服务端响应waitingServer 的this.webSocketState",
        this.webSocketState
      );
      // 假如是连接状态，持续进行心跳检测
      if (this.webSocketState) {
        this.startHeartBeat(this.heartBeat.time);
      } else {
        // 断线
        console.log("断线", this.heartBeat.times);
        try {
          this.close();
        } catch (e) {
          console.log("连接关闭");
        }
        console.log("start 重连");
        this.reconnectionWebSocket();
        console.log("end 重连");
      }
    }, this.heartBeat.timeout);
  }
  //断线重连
  reconnectionWebSocket() {
    console.log("断线重连", this.heartBeat.times);
    if (this.heartBeat.times < 5) {
      //重连次数,最多5次
      this.reconnectionTimer = setTimeout(() => {
        this.reConnctWs();
      }, this.heartBeat.reconnection);
    } else {
      console.log("关闭");
      this.close();
    }
  }
  reConnctWs() {
    if (!this.socket) {
      // 第一次执行初始化
      this.connect();
    }
    if (this.socket && this.reconnectionTimer) {
      this.heartBeat.times++;
      //防止多个计时器同时执行
      console.log("防止多个计时器同时执行");
      this.reconnectionTimer = null;
      this.reconnectionWebSocket();
    }
  }
  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketService;
