const getMenu = (config) => {

  const { username, password } = config;

  if (username === "admin" && password === "admin") {
    return {
      code: 1,
      data: {
        menu: [
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
        ],
        token: "Admin123456789",
      },
    };
  } else if (username === "user" && password === "user") {
    return {
      code: 1,
      data: {
        menu: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "HomeOutlined",
            url: "/home/index",
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
            ],
          },
        ],
        token: "User123456789",
      },
    };
  } else {
    return {
      code: 0,
      data: {
        menu: [
          {
            path: "/login",
            name: "login",
            label: "登陆",
            icon: "HomeOutlined",
            url: "/login",
          },
        ],
      },
    };
  }
};

export default getMenu;
