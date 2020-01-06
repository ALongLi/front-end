# oa

前端基本都做过 oa，但是个人的开发体验并不是很好，对于我这不经常开发 oa 需求的，突然去做一个 oa 的应用，一般会出现以下几个问题

1. oa 文档
2. 认证，老认证还是新认证
3. 终端版本

这三个问题确认不了很容易出问题，但是现在 svn 上已经没有老的文档了

## 现有问题与思考

未来执行的函数通常也叫 callback。使用 callback 的异步模式，解决了阻塞的问题，但是也带来了一些其他问题。主要表现为回调地狱，
一直认为回调地狱基本不会出现，但是在 oa 的认证中终于见识到了。

看到以下的代码，我决定重写了。接下来就是思考如何实现，我想解决的是以下几个问题

1. 解耦，将获取 token 和终端授权方法分开
2. 结束回调函数调用
3. 不能影响已有的业务，高可用的扩展
4. 简化代码调用，最终目标是脱离文档开发

```js
function getAccessFn(vue, options) {
  let jstoken = window.sessionStorage.getItem(options.token);
  let keyVal = window.sessionStorage.getItem(options.keyVal);
  companyId = options.companyId;
  if (!window.sessionStorage.getItem("companyId")) {
    window.sessionStorage.setItem("companyId", companyId);
  }
  EOA.callNative({
    method: "getSystemInfo",
    params: {},
    success: function(data) {
      for (let n = 0; n < options.jsApiList.length; n++) {
        if (Array.isArray(options.jsApiList[n], data.apiList) == -1) {
          if (options.jsApiList[n].indexOf("v1") != -1) {
            let newApi = options.jsApiList[n].substring(
              options.jsApiList[n].indexOf("v1") + 3,
              options.jsApiList[n].length
            );
            options.jsApiList.splice(n, 1, newApi);
          }
        }
      }
    },
    error: function() {
      options.error && options.error();
    }
  });
  if (!keyVal) {
    // 获取jsApi
    getApi(vue, {
      companyId: companyId,
      callBackFn: function(data) {
        //获取key
        getAccessKey({
          signMessage: data,
          jsApiList: options.jsApiList,
          callBackFn: function(data) {
            let keyVal = data.accessCode;
            window.sessionStorage.setItem(options.keyVal, keyVal);
            let code = data.freeLoginCode;
            //获取jstoken
            getJstoken(vue, {
              companyId: companyId,
              code: code,
              callbackFn: function(data) {
                jstoken = data;
                // console.log(jstoken,'jstoken')
                window.sessionStorage.setItem(options.token, jstoken);
                typeof options.callBackFn == "function" ? options.callBackFn(keyVal, jstoken) : "";
              },
              error: function() {
                options.error && options.error();
              }
            });
          },
          error: function() {
            options.error && options.error();
          }
        });
      },
      error: function() {
        options.error && options.error();
      }
    });
  } else {
    if (!jstoken) {
      getCode({
        keyVal: keyVal,
        callBackFn: function(data) {
          let code = data;
          getJstoken(vue, {
            companyId: companyId,
            code: code,
            callbackFn: function(data) {
              jstoken = data;
              // console.log(jstoken)
              window.sessionStorage.setItem(options.token, jstoken);
              typeof options.callBackFn == "function" ? options.callBackFn(keyVal, jstoken) : "";
            },
            error: function() {
              options.error && options.error();
            }
          });
        },
        error: function() {
          options.error && options.error();
        }
      });
    } else {
      typeof options.callBackFn == "function" ? options.callBackFn(keyVal, jstoken) : "";
    }
  }
}
```

## token 与 jsApis 获取解耦

对于一些用不到需要授权的终端方法其实是不需要调用授权的，但是现有的方式却耦合在一起了。
个人喜欢将接口拿出来单独维护所以新建了一个 auth.js

```js
// auth.js
import { getQueryString } from "@/utils/utils.js";
import Vue from "vue";
import axios from "axios";
// FormData 使用 ,json格式不用引入
import qs from "qs";
// 用户请求设置的方法
const authAxios = axios.create({
  baseURL: ""
});
authAxios.defaults.headers.post["Content-Type"] = "application/json";
// 设置拦截器
authAxios.interceptors.request.use(
  config => {
    if (config.method == "get") {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

// 设置响应拦截器
authAxios.interceptors.response.use(
  res => {
    let { flag } = res.data;
    switch (true) {
      case flag == 0:
        break;
      case flag == 1:
        // return Promise.resolve(res.data);
        break;
      case 2:
    }
    if (flag) {
      return Promise.resolve(res);
    }
    try {
      return Promise.resolve(res);
    } catch (e) {
      return Promise.resolve(res.data);
    }
  },
  err => {
    let msg = "出错啦！！";
    switch (err.response.status) {
      case 401:
        msg = "帐号登录超时，请重新登录";
        break;
      case 404:
        msg = "请求地址不存在";
        break;
      case 500:
        msg = "服务器内部异常";
        break;
      case 502:
        msg = "服务未启动，请先检查服务状态";
        break;
      case 503:
        msg = "服务器已超载或维护中导致请求无法完成";
        break;
      case 504:
        msg = "请求超时,请稍候重试";
        break;
      default:
        msg = "网络异常";
    }
    Vue.prototype.$toast(msg);
    return Promise.reject(err);
  }
);
function request(opts) {
  const defaultOptions = {
    method: "GET",
    url: "",
    data: {},
    params: {}
  };
  const options = Object.assign({}, defaultOptions, opts);
  return authAxios(options);
}

let companyId = getQueryString("companyId");
function getApis(data = { companyId }) {
  const opts = {
    method: "GET",
    url: "/jsoa-ht/h5/public/jsApiAuthParams",
    params: data
  };
  return request(opts);
}

function getToken(data) {
  const opts = {
    method: "POST",
    url: "/jsoa-ht/h5/public/login",
    data: data
  };
  return request(opts);
}
export { getApis, getToken };
```

无论是获取 token 还是授权 都需要调用终端的方法，所以所有其他的方法都统一实现在一起

## 终端方法

EOA 已经有了，为了不影响已有业务，决定使用类来实现这些方法，为什么没有直接用对象，
因为在整个应用中应该只有这一个对象，决定采用单例模式实现
接下来是代码实现，首先实现获取 token 认证的

```js
// eoa-extensions.js
import { getApis, getToken } from "./auth";
import { getQueryString } from "@/utils/utils";
import EOA from "./eoa";
/**
 * Creates a new Eoa oa功能封装
 * 对应 https://svn.xdja.com:8443/svn/YFPROJECT/项目管理/行业/金水区新OA/第三迭代/jsoa/产品库/开发环境版本/1.0.25.15
 * @file oa扩展功能封装
 * @author lal <lal@xdja.com>
 * @class
 * @classdesc 采用单例模式确保oa扩展只有一个实例
 */
class Eoa {
  constructor() {
    this.accessCode = "";
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Eoa();
    }
    return this.instance;
  }

  getFreeLoginCode() {
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "getFreeLoginCode",
        success: function(result) {
          resolve(result);
        },
        error: function(result) {
          reject(result);
        }
      });
    });
  }

  async getToken(opt) {
    let code = await this.getFreeLoginCode();
    let default_opt = {
      companyId: getQueryString("companyId"),
      appId: getQueryString("appId"),
      autoLoginCode: code
    };
    let params = Object.assign({}, default_opt, opt);
    let { data } = await getToken(params);
    let { result } = data;
    sessionStorage.setItem("jstoken", result.jstoken);
    sessionStorage.setItem("token", result.jstoken);
    return result;
  }
}

const oa = Eoa.getInstance();

export default oa;
```

接下来是终端授权方法

```js
  async registryApi(opt) {
    let that = this;
    // 调用api 获取signMessage
    let { data } = await getApis();
    let { result } = data;
    let default_opt = {
      signMessage: result,
      jsApiList: [
        "getFreeLoginCode",
        "selectFile",
        "setTitle",
        "selectDateInterval",
        "v1/selectAttUpload",
        "recordAudio",
        "playAudio",
        "stopPlayAudio",
        "log",
        "toast",
        "addEventListener",
        "finishActivity",
        "openImage",
        "openFileAndHint",
        "downloadFile",
        "selectImage",
        "selectPerson",
        "v1/selectPersons",
        "v2/selectPersons",
        "selectPersons",
        "setMenuVisibility",
        "setMenu",
        "uploadFile",
        "selectDate",
        "removeNoticeNum"
      ]
    };
    let opts = Object.assign({}, default_opt, opt);
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "config",
        params: {
          signMessage: opts.signMessage,
          jsApiList: opts.jsApiList
        },
        success: function(res) {
          console.log("调用oa-extensions config成功", res);
          that.accessCode = res.accessCode;
          sessionStorage.setItem("accessCode", res.accessCode);
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }
```

其实到这获取 token 和授权已经完成了，但是我想以后再开发 oa 应用的时候不看文档了，只要输入 oa 就能显示对应的方法和参数类型
这种 [typescript](https://www.tslang.cn/docs/home.html) 和 [jsdoc](http://www.dba.cn/book/jsdoc/) 都可以做到，这里就果断选择 jsdoc 了,直接上代码

````js
class Eoa {
  constructor() {
    this.accessCode = "";
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Eoa();
    }
    return this.instance;
  }

  /**
   * 调用终端获取免登码
   * @returns {Promise} promise对象
   */
  getFreeLoginCode() {
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "getFreeLoginCode",
        success: function(result) {
          resolve(result);
        },
        error: function(result) {
          reject(result);
        }
      });
    });
  }
  /**
   *
   * 获取jstoken 默认将jstoken 存储到 sessionStorage 中jstoken ,token 也通过 promise 返回了
   * @description 获取jstoken 默认将jstoken 存储到 sessionStorage 中jstoken ,token 也通过 promise 返回了
   * @example `await oa.getToken`
   * @typedef {Object} IOpt
   * @property {string} companyId 企业id
   * @property {string} appId  应用id
   * @property {string} autoLoginCode 终端生成免登码
   * @param {IOpt} [opt]
   */
  async getToken(opt) {
    let code = await this.getFreeLoginCode();
    let default_opt = {
      companyId: getQueryString("companyId"),
      appId: getQueryString("appId"),
      autoLoginCode: code
    };
    let params = Object.assign({}, default_opt, opt);
    let { data } = await getToken(params);
    let { result } = data;
    sessionStorage.setItem("jstoken", result.jstoken);
    sessionStorage.setItem("token", result.jstoken);
    return result;
  }

  /**
   *
   * 注册需要鉴权的终端方法，默认注册所有
   * @example
   * ```js
   * oa.registryApi()
   * ```
   * @typedef {Object} ISignMessage
   * @property {string} corpId 企业id
   * @property {string} signature 签名
   * @property {string} noncestr 生成的签名随机串
   * @property {string} timestamp 生成的签名的时间戳
   *
   * @param {{signMessage: ISignMessage, jsApiList: array}} [opt] 参数
   */
  async registryApi(opt) {
    let that = this;
    // 调用api 获取signMessage
    let { data } = await getApis();
    let { result } = data;
    let default_opt = {
      signMessage: result,
      jsApiList: [
        "getFreeLoginCode",
        "selectFile",
        "setTitle",
        "selectDateInterval",
        "v1/selectAttUpload",
        "recordAudio",
        "playAudio",
        "stopPlayAudio",
        "log",
        "toast",
        "addEventListener",
        "finishActivity",
        "openImage",
        "openFileAndHint",
        "downloadFile",
        "selectImage",
        "selectPerson",
        "v1/selectPersons",
        "v2/selectPersons",
        "selectPersons",
        "setMenuVisibility",
        "setMenu",
        "uploadFile",
        "selectDate",
        "removeNoticeNum"
      ]
    };
    let opts = Object.assign({}, default_opt, opt);
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "config",
        params: {
          signMessage: opts.signMessage,
          jsApiList: opts.jsApiList
        },
        success: function(res) {
          console.log("调用oa-extensions config成功", res);
          that.accessCode = res.accessCode;
          sessionStorage.setItem("accessCode", res.accessCode);
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }
}
````

这样就可以有智能提示了

## oa 常用方法封装

按照以上操作，我把项目中用的一些方法封装了下，没用到的因为时间以及需要验证暂时未封装，完整代码如下

````js
import { getApis, getToken } from "./auth";
import { getQueryString } from "@/utils/utils";
import EOA from "./eoa";
/**
 * Creates a new Eoa oa功能封装
 * 对应 https://svn.xdja.com:8443/svn/YFPROJECT/项目管理/行业/金水区新OA/第三迭代/jsoa/产品库/开发环境版本/1.0.25.15
 * @file oa扩展功能封装
 * @author lal <lal@xdja.com>
 * @class
 * @classdesc 采用单例模式确保oa扩展只有一个实例
 */
class Eoa {
  constructor() {
    this.accessCode = "";
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Eoa();
    }
    return this.instance;
  }

  /**
   * 调用终端获取免登码
   * @returns {Promise} promise对象
   */
  getFreeLoginCode() {
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "getFreeLoginCode",
        success: function(result) {
          resolve(result);
        },
        error: function(result) {
          reject(result);
        }
      });
    });
  }
  /**
   *
   * 获取jstoken 默认将jstoken 存储到 sessionStorage 中jstoken ,token 也通过 promise 返回了
   * @description 获取jstoken 默认将jstoken 存储到 sessionStorage 中jstoken ,token 也通过 promise 返回了
   * @example `await oa.getToken`
   * @typedef {Object} IOpt
   * @property {string} companyId 企业id
   * @property {string} appId  应用id
   * @property {string} autoLoginCode 终端生成免登码
   * @param {IOpt} [opt]
   */
  async getToken(opt) {
    let code = await this.getFreeLoginCode();
    let default_opt = {
      companyId: getQueryString("companyId"),
      appId: getQueryString("appId"),
      autoLoginCode: code
    };
    let params = Object.assign({}, default_opt, opt);
    let { data } = await getToken(params);
    let { result } = data;
    sessionStorage.setItem("jstoken", result.jstoken);
    sessionStorage.setItem("token", result.jstoken);
    return result;
  }

  /**
   *
   * 注册需要鉴权的终端方法，默认注册所有
   * @example
   * ```js
   * oa.registryApi()
   * ```
   * @typedef {Object} ISignMessage
   * @property {string} corpId 企业id
   * @property {string} signature 签名
   * @property {string} noncestr 生成的签名随机串
   * @property {string} timestamp 生成的签名的时间戳
   *
   * @param {{signMessage: ISignMessage, jsApiList: array}} [opt] 参数
   */
  async registryApi(opt) {
    let that = this;
    // 调用api 获取signMessage
    let { data } = await getApis();
    let { result } = data;
    let default_opt = {
      signMessage: result,
      jsApiList: [
        "getFreeLoginCode",
        "selectFile",
        "setTitle",
        "selectDateInterval",
        "v1/selectAttUpload",
        "recordAudio",
        "playAudio",
        "stopPlayAudio",
        "log",
        "toast",
        "addEventListener",
        "finishActivity",
        "openImage",
        "openFileAndHint",
        "downloadFile",
        "selectImage",
        "selectPerson",
        "v1/selectPersons",
        "v2/selectPersons",
        "selectPersons",
        "setMenuVisibility",
        "setMenu",
        "uploadFile",
        "selectDate",
        "removeNoticeNum"
      ]
    };
    let opts = Object.assign({}, default_opt, opt);
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "config",
        params: {
          signMessage: opts.signMessage,
          jsApiList: opts.jsApiList
        },
        success: function(res) {
          console.log("调用oa-extensions config成功", res);
          that.accessCode = res.accessCode;
          sessionStorage.setItem("accessCode", res.accessCode);
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }

  /**
   *
   * 调用终端选择文件并上传
   * @description 调用终端选择文件并上传
   * @example `await oa.selectAttUpload`
   * @typedef {Object} IOpt
   * @property {array} selectModeOption  选择方式，0 图片 1 相机 2 文件选择
   * @property {string} maxCount   选择文件个数限制
   * @property {array} existFiles 已选择的图片
   * @property {number} maxLength 文件大小 byte
   * @param {IOpt} [opt]
   * @returns {Promise} promise对象
   */
  selectAttUpload(opt) {
    let default_opt = {
      selectModeOption: [0, 1, 2], //选择方式，目前支持图片0、相机1、附件2；
      maxCount: 9,
      existFiles: [],
      maxLength: 10 * 1048576 //默认为5M，long型，单位为byte
    };
    let params = Object.assign({}, default_opt, opt);
    let accessKey = this.accessCode;
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "v1/selectAttUpload",
        accessKey,
        params,
        success(res) {
          resolve(res);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }

  /**
   *
   * 设置应用 标题 title
   * @description 设置应用 标题 title
   * @param {string} title 标题文案
   */
  setTitle(title) {
    EOA.callNative({
      method: "setTitle",
      params: title
    });
  }

  /**
   *
   * 设置菜单显示/隐藏 默认设置id 为1 的隐藏
   * @description  设置菜单显示/隐藏 默认设置id 为1 的隐藏
   * @param {array} [location] 菜单的id, 右侧菜单按钮从右向左依次为 1 2 默认值为[1]
   * @param {string} [type] visible:显示 invisible:不显示但占位 gone:隐藏 默认值为gone
   */
  setMenuVisibility(location = [1], type = "gone") {
    let params = location.map(id => {
      return {
        location: id,
        visibility: type
      };
    });
    EOA.callNative({
      method: "setMenuVisibility",
      params
    });
  }
  /**
   *
   * 设置标题栏的菜单，支持文字和图标类型，图标优先显示，多个图标顺序为从右至左
   * @description  设置标题栏的菜单，支持文字和图标类型，图标优先显示，多个图标顺序为从右至左
   * @param {{id: Number, icon: String, textColor: String}[]} params 菜单参数
   */
  setMenu(params) {
    EOA.callNative({
      method: "setMenu",
      params
    });
  }

  /**
   *
   * 根据文件url下载文件，需要传入文件名，根据文件url和name确定唯一下载，都相同则可以触发断点续传，使用下载缓存
   * @param {string} fileUrl 文件下载地址
   * @param {string} fileName 文件名
   * @returns {Promise} promise 成功状态下载完成后的本地地址
   */
  downloadFile(fileUrl, fileName) {
    return new Promise((resolve, reject) => {
      EOA.callNative({
        method: "downloadFile",
        params: {
          fileUrl,
          fileName
        },
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }

  /**
   *
   * 调用系统能力打开、查看文件
   * @param {string} fileAddress 文件本地路径
   */
  openFileAndHint(fileAddress) {
    EOA.callNative({
      method: "openFileAndHint",
      params: fileAddress
    });
  }

  /**
   *
   * 添加到标题栏上的菜单被点击时触发
   * @param {function} callBack 点击触发的回调函数
   */
  onMenuClick(callBack) {
    EOA.addEventListener("onMenuClick", "", id => callBack(id));
  }
  /**
   *
   * 返回事件监听  注册此监听后，客户端容器将不再自己处理返回事件。如果需要关闭容器，需调用finishActivity接口。
   * @param {function} callBack 点击触发的回调函数
   */
  onBack(callBack) {
    EOA.addEventListener("onBack", "", () => callBack());
  }

  /**
   *
   * 网页回退，同浏览器的回退。
   */
  goBack() {
    EOA.callNative({
      method: "goBack",
      params: {
        autoFinishActivity: true // 页面history为0时是否关闭当前页面，默认为true(PC端没有这个参数)
      }
    });
  }

  /**
   * 关闭客户端当前webview打开的应用界面。
   */
  closeWebView() {
    EOA.callNative({
      method: "finishActivity"
    });
  }
}

const oa = Eoa.getInstance();

export default oa;
````

## 最终演示效果

![eslintFixed](../imgs/oa.gif)
