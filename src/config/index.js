// eslint-disable-next-line import/no-anonymous-default-export

var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push("A" + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
let option = {
  // title: {
  //   text: 'Bar Animation Delay'
  // },
  legend: {
    data: ["bar", "bar2"],
  },
  // toolbox: {
  //   // y: 'bottom',
  //   feature: {
  //     magicType: {
  //       type: ['stack']
  //     },
  //     dataView: {},
  //     saveAsImage: {
  //       pixelRatio: 2
  //     }
  //   }
  // },
  // tooltip: {},
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false,
    },
  },
  yAxis: {},
  series: [
    {
      name: "bar",
      type: "bar",
      data: data1,
      emphasis: {
        focus: "series",
      },
      animationDelay: function (idx) {
        return idx * 10;
      },
    },
    {
      name: "bar2",
      type: "bar",
      data: data2,
      emphasis: {
        focus: "series",
      },
      animationDelay: function (idx) {
        return idx * 10 + 100;
      },
    },
  ],
  // animationEasing: 'elasticOut',
  // animationDelayUpdate: function (idx) {
  //   return idx * 5;
  // }
};
const chartData2 = option;
let chartData = {
  // title: {
  //   text: 'Stacked Line'
  // },
  // tooltip: {
  //   trigger: 'axis'
  // },
  // legend: {
  //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  // },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

let chartData3 = {
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

export { chartData, chartData2, chartData3 }; //首页图片


const userData = [];
for (let i = 0; i < 100; i++) {
  userData.push({
    key: i,
    num:i,
    addr: "广东省佛山市高明区",
    age: 55,
    id: `124223456214+${i}`,
    name: `test${i}`,
    sex:  i%2===0?0:1,
    date:  "1998/01/06",
  });
}




export { userData };

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "HomeOutlined",
    url: "/home/index",
  },
  {
    path: "/mall",
    name: "mall",
    label: "mall页",
    icon: "HomeOutlined",
    url: "/mall/index",
  },
  {
    path: "/user",
    name: "user",
    label: "user页",
    icon: "ShopOutlined",
    url: "/user/index",
  },
  {
    path: "/other",
    label: "其他",
    icon: "SettingOutlined",
    children: [
      {
        path: "/other/pageOne",
        name: "page1",
        label: "page1页",
        icon: "SettingOutlined",
      },
      {
        path: "/other/pageTwo",
        name: "page2",
        label: "page2页",
        icon: "SettingOutlined",
      },
    ],
  },
];
