import { Button, Checkbox, Form, Input, Card, message } from "antd";
import React from "react";
import "./login.scss";
import getMenu from "../../config/permission"; //模拟获取路由信息
import { useNavigate, Navigate } from "react-router-dom"; //useNavigate使用跳转钩子 Navigate重定向
import api from "../../api";
const Login = () => {
  const navigate = useNavigate();

  //   在登陆状态下，直接跳转到home
  if (localStorage.getItem("token")) {
    // replace是重定向
    return <Navigate to="/home" replace></Navigate>;
  }
  // 登陆按钮
  const onFinish = (values) => {
    if (!values.username || !values.password) {
      message.error("请输入登陆信息");
    } else {
      // 本地测试账密admin admin
      let data = getMenu({
        //假装处理登陆方法
        username: values.username,
        password: values.password,
      });
      api.getTest(1).then(res=>{
        console.log(res)
      })
      api.login({ username: values.username, password: values.password }).then(res=>{
        console.log(res)
      })
      console.log(data, data.code, values);
      if (data.code) {
        //返回数据，登陆成功
        console.log("***eeee**");
        if (values.remember) {
          localStorage.setItem("token", data.data.token);
        }
        localStorage.setItem("role", values.username);
        localStorage.setItem("timeout", Date.now() + 3600000); //1小时过期

        navigate({ pathname: "/home" }, { state: values.username });

        // state传参：传的值保存在useLocation().state中
        // nav({pathname:'discovery'},{state:{name:'tom'}})

        // nav('discovery?name=tom&age=23')

        // query传参（查询传参）：传的值保存在useLocation().search中
        // nav({pathname:'discovery',search:'?name=tom&age=21'})

        // 动态路由传参：传的值保存在useParams中
        // nav({pathname:'discovery2/2024'})
      } else {
        message.error("密码错误");
      }
    }
  };
  // 登陆
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //注册
  const  register=()=>{
    console.log('zhue')
    // api.login({ username: values.username, password: values.password }).then(res=>{
    //   console.log(res)
    // })
  }
  return (
    <div className="flex f-c login-box">
      <Card style={{ width: 300 }}>
        <Form
          initialValues={{
            remember: false, // 假设这是要回显的chackbox状态（是否记住密码的按钮，设置在Form设置
          }}
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          // layout="vertical "
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="tit">系统登陆</div>
          <Form.Item label="账号" name="username">
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            // wrapperCol={{
            //   offset: 8,
            //   span: 16,
            // }}
          >
             <Button type="primary" style={{marginRight:'20px'}} onClick={register}>
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
