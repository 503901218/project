import { createSlice } from "@reduxjs/toolkit";
const setInit = () => {
  return [
    //tab信息，用于兄弟切换tab组件
    {
      path: "/home",
      name: "home",
      label: "首页",
      currentChoose: false, //是否当前选中tab
    },
  ];
};
const tabSlice = createSlice({
  //切片
  name: "tab",
  initialState: {//初始值
    isCollapse: false,//是否展开菜单
    tabList: [
      //tab信息，用于兄弟切换tab组件
      {
        path: "/home",
        name: "home",
        label: "首页",
        currentChoose: false, //是否当前选中tab
      },
    ],
  
  },
  reducers: { //用于同步修改状态，是纯函数
    collapseMenu: (state) => {
      //拿到state,action,修改state
      state.isCollapse = !state.isCollapse;
    },
    initMenu: (state) => {
      state.tabList = setInit();
      // state.tabList = [ {
      //   path: "/home",
      //   name: "home",
      //   label: "首页",
      //   currentChoose: false, //是否当前选中tab
      // }];
    },
    selectMenuList: (state, { payload: data }) => {
      let flag = state.tabList.findIndex((item) => item.name === data.name);

      state.tabList.map((i) => (i.currentChoose = false));
      if (
        data.name !== "home" ||
        (data.name === "home" && state.tabList.length !== 1)
      ) {
        // 没有这个地址，没重复
        if (flag === -1) {
          data.currentChoose = true;
          state.tabList.push(data);
        } else {
          state.tabList[flag].currentChoose = true;
        }
      } else if (data.name === "home" && state.tabList.length === 1) {
        //是首页
        state.tabList = setInit();
      }
      console.log(state.tabList);
    },
    closeTag: (state, { payload: val }) => {
      let index = state.tabList.findIndex((item) => val.name === item.name);

      state.tabList.splice(index, 1);
      console.log("剩余的tab", state.tabList.length);
      if (
        state.tabList.length === 0 ||
        (state.tabList.length > 0 &&
          state.tabList[0].name === "home" &&
          state.tabList.length === 1)
      ) {
        // 返回首页||剩下最后一个关闭的是首页
        state.tabList = setInit();

        return;
      }

      // 修改当前高亮 tab数据长度>0
      if (val.currentChoose && state.tabList.length > 0) {
        //被删的是高亮
        if (index === state.tabList.length) {
          //是最后一个
          console.log(state.tabList[state.tabList.length - 1]);
          state.tabList[state.tabList.length - 1].currentChoose = true; //剩余最后一位高亮
        } else {
          state.tabList[index].currentChoose = true; //后一位高亮
        }
      }
    },
   
  },
});

export const { collapseMenu, selectMenuList, closeTag,initMenu } = tabSlice.actions;
export default tabSlice.reducer;
