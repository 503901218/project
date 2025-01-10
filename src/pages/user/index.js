import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import { userData } from "../../config";
import "./user.scss";
const User = () => {
  const [modelType, setModelType] = useState(0); //弹窗标题
  const [isModalOpen, setIsModalOpen] = useState(false); //弹窗显示
  const [listData, setListData] = useState({
    name: "",
  }); //搜索名字的内容

  //获取from实例绑定给From，通过 Form.useForm 对表单数据域进行交互
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState(); //表单内容

  useEffect(() => {
    //首次加载
    getData(userData);
    console.log('首次加载')
  }, []);

  // 监听搜索内容，返回搜索请求
  useEffect(() => {
    getData(userData);
    console.log('听搜索内容')
  }, [listData]);

  useEffect(() => {
   
    console.log('监听tableData',tableData)
  }, [tableData]);

  // 新增、编辑
  function handleClick(type, rowData) {
    setIsModalOpen(!isModalOpen);

    if (type === "add") {
      //弹窗title
      setModelType(0);
    } else {
      //编辑
      setModelType(1);

      const colneData = JSON.parse(JSON.stringify(rowData));

      colneData.date = dayjs(colneData.date);

      // 表单回填
      form.setFieldsValue(colneData);
    }
  }

  // 接口请求函数
  const getData = (data,page) => {
    let t = [...data];
    console.log(' 接口请求函数getData')
    // 请求后赋值
    setTableData([...t]);
    
  };

  // 搜索时 提交处理函数
  const handleFrom = (values) => {
    setListData({ name: values.keyword });
    console.log("提交", values.keyword);
    // 在这里，你可以访问 values.keyword 来获取输入框的值
    // 假装赋值
    let flag = tableData;
    getData(flag);
  };

  // 解构获取id写法
  // 删除 const handelDelete = ({id}) => {直接判断id}
  const handelDelete = (rowData) => {
    // 深拷贝操作
    const deleteData = JSON.parse(JSON.stringify(rowData));

    let flag = tableData;

    for (let i = 0; i < flag.length; i++) {
      if (deleteData.id === flag[i].id) {
        let t = flag.splice(i, 1);
        console.log(flag, i, t);
      }
    }
    // 假装赋值
    getData(flag);
  };

  const columns = [
    { title: "序号", dataIndex: "num" },
    //列名，dataIndex对应内容listData
    { title: "姓名", dataIndex: "name" },
    { title: "年龄", dataIndex: "age" },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        //当前列数据处理函数，table自带属性，设置了dataIndex，render拿到设置dataIndex数据，没设置拿到当前行全部数据
        return val ? "女" : "男";
      },
    },
    { title: "日期", dataIndex: "date" },
    { title: "地址", dataIndex: "addr" },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <div className="flex">
            <Button
              style={{ marginRight: "5px" }}
              type="primary"
              onClick={() => handleClick("edit", rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="此操作将会删除改用户，是否确认"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handelDelete(rowData);
              }}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  //新增、编辑的按钮点击 弹窗事件
  const handleOk = () => {
    // 表单内容检验通过
    form
      .validateFields()
      .then((res) => {
        res.date = dayjs(res.date).format("YYYY/MM/DD");
      
        let flag = tableData;

        if (modelType) {
          //编辑
          for (let i = 0; i < flag.length; i++) {
            if (res.id === flag[i].id) {
              flag[i] = res;
            }
          }
          // setTableData(flag);
        } else {
          res.num=tableData.length
          res.id= `124223456214+${tableData.length}`
          flag.unshift(res);
        
          // setTableData(flag);
        }
          getData(flag)
        //确认按钮
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 关闭弹窗
  const handleCancel = () => {
    console.log(tableData)
    setIsModalOpen(false);
    form.resetFields(); //弹窗内容清空
  };
  //分页、排序、筛选变化时触发
  const changeTable = (e) => {
    console.log("分页、排序、筛选变化时触发", e);
    // getData(userData,e.current);
  };
  return (
    <div>
      <div className="user ">
        <div className="flex-box flex jc-sb">
          <Button type="primary" onClick={() => handleClick("add")}>
            +新增
          </Button>

          <Form layout="inline" onFinish={handleFrom}>
            <Form.Item name="keyword">
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <Table columns={columns} dataSource={tableData} rowKey={"id"}></Table> */}

        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={tableData}
          pagination={true}
          onChange={(e) => changeTable(e)}
        ></Table>

        {/* 弹窗 */}
        <Modal
          title={modelType ? "编辑" : "新增"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            form={form}
          >
            {/* 编辑弹窗对象赋值id */}
            {modelType === 1 && (
              <Form.Item name="id" style={{ display: "none" }}></Form.Item>
            )}
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              label="年龄"
              name="age"
              rules={[
                { required: true, message: "请输入年龄" },
                { type: Number, message: "请输入数字" },
              ]}
            >
              <InputNumber placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
              rules={[{ required: true, message: "性别必选" }]}
            >
              <Select
                placeholder="请输入性别"
                options={[
                  {
                    value: 0,
                    label: "男",
                  },
                  {
                    value: 1,
                    label: "女",
                  },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item
              label="生日"
              name="date"
              rules={[{ required: true, message: "请选择生日" }]}
            >
              <DatePicker placeholder="请选择生日" format={"YYYY/MM/DD"} />
            </Form.Item>
            <Form.Item
              label="地址"
              name="addr"
              rules={[{ required: true, message: "请输入地址" }]}
            >
              <Input placeholder="请输入地址" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default User;
