# 布局

![layout](../imgs/layout.png)

vue-manager 点击侧边导航的页面都是基于这个 layout 的，除了个别页面如：login , 404, 401 等页面没有使用该 layout。如果你想在一个项目中有多种不同的 layout 也是很方便的，只要在一级路由那里选择不同的 layout 组件就行。

```javascript
  //
    {
      path: "/",
      // 使用layout布局
      component: Layout,
      redirect: "/home",

      //children中的路由都会在主内容区域
      children: [
        {
          path: "/home",
          component: _import("Home"),
          name: "home"
        }
      ]
    },

    // nestedRouter,
    // componentsRouter,
    // settingRouter,
    mockRouter,
    // 登陆和 login 没用layout
    {
      path: "/404",
      name: "404",
      component: _import("404"),
      meta: {
        title: "404"
      }
    },
    {
      path: "/login",
      name: "login",
      component: _import("Login")
    }
```
