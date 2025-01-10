import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAction, subAction } from "../../store/reducers/counter";
const PageOne = () => {
  const dispatch = useDispatch();
  // const [sum,setSum]=useState(useSelector(state=>state.counter.sum))

  const sum = useSelector((state) => state.counter.sum);
  useEffect(() => {
    console.log(sum);
  }, []);
  return (
    <div>
     
      <div> 使用cunter仓库内容</div>
      <Button type="primary" onClick={() => dispatch(addAction(1))}>
        +1
      </Button>
      {sum}
      <Button type="primary" onClick={() => dispatch(subAction(1))}>
        -1
      </Button>
    </div>
  );
};
export default PageOne;
