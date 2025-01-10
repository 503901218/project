import React, { useContext, useReducer, useState } from "react";
import { MyContext, useCreateContext } from "../../components/context/context";
import { Button, Input, Space } from "antd";

// useReducer的可执行回调函数
const reducer = (state, action) => {
  let t = JSON.parse(JSON.stringify(state)); //state是较为复杂的数据类型，需要进行深拷贝
  //参数通过action对象传入
  switch (action.type) {
    case "add": {
      //单纯一维数组可以直接返回return{...state,age:state.age+=action.num}
      t.map((i) => {
        if (i.id === action.id) {
          i.age += action.num;
        }
      });
      return t;
    }
    case "edit": {
      console.log("编辑edit", action);
      let a = t.map((i) => {
        if (i.id === action.id) {
          i.text = action.text;
        }
      });

      return t;
    }
    case "del": {
      let index = t.findIndex((i) => i.id === action.id);
      if (index !== -1) {
        t.splice(index, 1);
      }

      return t;
    }
    default: {
      return state;
    }
  }
};
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true, age: 1 },
  { id: 1, text: "Watch a puppet show", done: false, age: 1 },
  { id: 2, text: "Lennon Wall pic", done: false, age: 1 },
];
const Mallson = () => {
  const { data, setData } = useContext(MyContext);
  //   useReducer用法与userState类似，但是可以同时处理多个函数，reducer可以写在组件外面
  const [stateData, dispatch] = useReducer(reducer, initialTasks); //reducer是可执行回调 initialTasks是初始数据 返回给stateData

  return (
    <>
      {/*  */}
      <p>-------Mallson组件分割线-------</p>
      <div
        className="mall-son flex f-c flex-col"
        style={{ width: 300, backgroundColor: "#e0e9ff", height: 100 }}
      >
        隔代获取来自main组件的context:{data}
        <Button onClick={setData}>隔代修改context</Button>
      </div>

      <div>
        **********使用userReducer*********
        useReducer用法与userState类似，但是可以同时处理多个函数，reducer可以写在组件外面
        {stateData.map((i) => {
          return (
            <div key={i.id}>
              <TestItem
                i={i}
                onEdit={(item) => dispatch(item)}
                onAdd={(item) => dispatch(item)}
                onDelete={(item) => dispatch(item)}
              ></TestItem>
            </div>
          );
        })}
      </div>
    </>
  );
};

const TestItem = ({ i, onEdit, onAdd, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  const clickEdit = (flag) => {
    setIsEditing(flag);
  };
  const changeInfo = (e) => {
    onEdit({
      type: "edit",
      id: i.id,

      text: e.target.value,
    });
  };
  if (isEditing) {
    taskContent = (
      <>
        <input onChange={(e) => changeInfo(e)} value={i.text} />
        <Button onClick={() => clickEdit(false)}>save</Button>
      </>
    );
  } else {
    taskContent = (
      <>
        {i.text}
        <Button type="primary" onClick={() => clickEdit(true)}>
          编辑
        </Button>
      </>
    );
  }
  return (
    <>
      <Space style={{ marginTop: 20 }}>
        <div className="flex f-c" style={{}}>
          <div>id:{i.id}, &nbsp; </div>
          <div> age:{i.age}, &nbsp; </div>
          <div>姓名:</div>
        </div>
        {taskContent}{" "}
        <Button
          type="primary"
          onClick={() => onAdd({ type: "add", num: 1, id: i.id })}
        >
          增加age
        </Button>
        <Button danger onClick={() => onDelete({ type: "del", id: i.id })}>
          删除
        </Button>
      </Space>
    </>
  );
};
export default Mallson;
