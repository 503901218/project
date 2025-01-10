// import logo from './logo.svg';
import './App.scss';
import './static/common.scss'
import {RouterProvider} from 'react-router-dom'
import router  from './router';
import {  Grid,Tag } from "antd";
import { ConfigProvider } from 'antd';

const { useBreakpoint } = Grid;
function App() {
  const screens = useBreakpoint();//展示当前屏幕是什么尺寸
  return (
    <div className='app'>
       {/* 展示当前屏幕是什么尺寸 */}
       {/* <>
        Current break point:{" "}
        {Object.entries(screens)
          .filter((screen) => !!screen[1])
          .map((screen) => (
            <Tag color="blue" key={screen[0]}>
              {screen[0]}
            </Tag>
          ))}
      </> */}
      {/* 而RouterProvider组件则负责将这个路由实例注入到React组件树中，从而使得整个React应用都能访问和使用这些路由 */}
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
