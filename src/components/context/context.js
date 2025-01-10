import React, { createContext, useState, useContext } from "react";
// 子组件需要引入MyContext才能使用
const MyContext = createContext();
//封装引入语句
const useCreateContext = () => {
  return useContext(MyContext);
};

// 最上一层的父组件需要用MyProviderContext,children就是内部的node节点，直接渲染
export const MyProviderContext = ({children}) => {
  const [mallData, setMallData] = useState(1);
  const [themeColor, setThemeColor] = useState(true);

  const changeMallData = () => {
    setMallData((s) =>{
        console.log(s)
        return s+1
        // s + 1
    });
  };
  //传递给子代的数据
  const initialState = {
    data: mallData,
    themeColor:themeColor,
    setThemeColor:setThemeColor,
    setData: changeMallData,
  };

  return (
    <MyContext.Provider value={initialState}>
      {children}
    </MyContext.Provider>
  );
};
export { MyContext, useCreateContext };
