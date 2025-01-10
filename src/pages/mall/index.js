import React, { useContext } from "react";
import { MyProviderContext ,useCreateContext,MyContext} from "../../components/context/context";
import  Mallson  from "./mellson";
const Mall = () => {

  //结构获得context内容数据
  const { data, setData } = useCreateContext()//useContext(MyContext);

  return (
    <div>
     ********** Mall组件内*************
      <p>Data from Main组件:{data}</p>
      <button onClick={() => setData(data)}>Mall中修改</button>
      {/* <MyContext> */}
        <Mallson></Mallson>
      {/* </MyContext> */}
      
    </div>
  );
};
export default Mall;
