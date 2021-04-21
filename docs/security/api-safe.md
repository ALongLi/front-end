# 信息完整性

一直以来前端都只是调用后台的接口传递参数，其他的都基本不管，直到经历了各种漏洞扫描，安全测试问题更改，接下来主要说一下如何保证接口安全。

## 主要的安全问题

1. 防伪装攻击（案例：csrf）
2. 防篡改攻击（案例： 在传输过程内容被修改）

## 解决方案设计原则

1. 新项目易于开发
2. 老项目易于接入
3. 解决上述描述的安全问题

## 设计思路

对接口参数进行签名，查了下签名算法基本就是那些，这里使用和登录相关的算法 `md5` 和 `hmac-sha512`。

| 参数名    | 类型   | 必选 | 描述                                                                                                             |
| --------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------- |
| secretKey | string | true | 签名临时密钥，通过后台接口获取                                                                                   |
| keyTime   | string | true | 时间戳，包含开始时间结束时间 ， 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误 |
|           |
| params    | object | true | 请求参数 对象串                                                                                                  |

## 签名步骤

### 步骤 1：生成 keyTime

1. 获取当前时间对应的 Unix 时间戳 StartTimestamp，Unix 时间戳是从 UTC（协调世界时，或 GMT 格林威治时间）1970 年 1 月 1 日 0 时 0 分 0 秒（北京时间 1970 年 1 月 1 日 8 时 0 分 0 秒）起至现在的总秒数。
2. 根据上述时间戳和期望的签名有效时长算出签名过期时间对应的 Unix 时间戳 EndTimestamp。

3. 拼接签名有效时间，格式为 StartTimestamp;EndTimestamp，即为 keyTime。例如：1557902800;1557910000。

### 步骤 2：生成 signKey

使用 `HMAC-SH512` 以 SecretKey 为密钥，以 `md5`后的`keyTime` 为消息，计算消息摘要，即为 signKey，例如：`2da144479d80149fb221d620a750ca106dd9787a0f037c76b33e5e48bd8f6fc5b6e1a15bb767663063501e663505c37f81d9ff32809b145a61c281c78e475b5e`。

### 步骤 3：根据 params 生成 httpParameters 字符串

1. 遍历 HTTP 请求参数，生成 key 的列表 KeyList：
2. 将 KeyList 按照 ASCII 码从小到大排序（字典序）
3. 按照 KeyList 的顺序拼接 params 中的每一个键值对，格式为 key1=value1&key2=value2&key3=value3，即为 httpParameters。

### 步骤 4：生成 signature

使用`HMAC-SH512` 以 `signKey` 为密钥（字符串形式，非原始二进制），以 `httpParameters` 为消息，计算消息摘要，即为 signature，例如：`2da144479d80149fb221d620a750ca106dd9787a0f037c76b33e5e48bd8f6fc5b6e1a15bb767663063501e663505c37f81d9ff32809b145a61c281c78e475b5e`。

## 使用范围

1. 请求格式为`application/json`
2. 所有写操作接口（增、删、改 操作）

## 总结

1. 接口调用方在调用时把加密后的签名（signature） 放在请求头去请求接口
2. 接口提供方接到响应后，判断时间戳是不是在有效时间
3. 接口调用方和接口提供方约定好统一的参数加密算法，如上。计算请求参数的签名对比是否一致

## 代码实现

以下是前端代码的实现思路

```js
/*
 * @description:
 * @Author: lal
 * @Date: 2020-09-07 17:59:29
 * @LastEditors: lal
 * @LastEditTime: 2020-09-07 19:43:05
 */
$(function() {
  var md5 = CryptoJS.MD5;
  var hmacSHA512 = CryptoJS.HmacSHA512;
  var Signature,
    SecretKey = "123",
    keyTime = "123;234";

  $.ajaxSetup({
    beforeSend: function(xhr, config, t) {
      debugger;
      //   请求签名
      if (config.type == "POST") {
        Signature = createSignature(keyTime, SecretKey, config.data);
        // console.log("签名", Signature);
        xhr.setRequestHeader("signature", Signature);
        xhr.setRequestHeader("secretKey", SecretKey);
        xhr.setRequestHeader("keyTime", keyTime);
      }
      xhr.setRequestHeader("token", "123");
    },
  });

  /**
   * @description 生成请求签名
   * @param {string} keyTime  秘钥时间
   * @param {string} SecretKey  秘钥
   * @param {string} paramsString  请求参数 json字符串
   */
  function createSignature(keyTime, SecretKey, paramsString) {
    var keyTimeMd5 = md5(keyTime).toString();
    var SignKey = hmacSHA512(keyTimeMd5, SecretKey).toString();
    var signature = hmacSHA512(paramsString, SignKey).toString();
    $("#front").html(
      `<p>keyTimeMd5:${keyTimeMd5}</p>
      <p>SignKey:${SignKey}</p>
      <p>signature:${signature}</p>
      <p>paramsString:${paramsString}</p>`
    );

    return signature;
  }

  $.ajax({
    type: "get",
    url: "key",
    contentType: "application/json",
    dataType: "json",
    success: function(response) {
      SecretKey = response.key;
      keyTime = response.time;
    },
  });

  function login() {
    var params = {
      b: 2,
      name: "abc",
      password: "123456",
      a: 1,
      c: { b: 1, a: 23 },
      d: [1, 2, 3],
      e: [
        {
          g: "g",
          f: 1,
        },
        {
          i: "i",
          h: "H",
        },
        ["汉字", "中国"],
      ],
      address: "河南省",
      jsonrpc: "2.0",
      id: "1",
      method: "bindCard",
      params: { account: "xiaoli", cardNo: "78646a6178646a6134355532370b603b" },
    };
    $.ajax({
      type: "post",
      // url: "api/sign",
      url: "/topsec-war/admin/public/login",
      data: JSON.stringify(params),
      contentType: "application/json",
      dataType: "json",
      success: function(response) {
        debugger;
        $("#back").html(
          `<p>keyTimeMd5:${response.md5}</p>
      <p>SignKey:${response.hmac1}</p>
      <p>signature:${response.hmac2}</p>
      <p>paramsString:${response.sb}</p>`
        );

        //53ec28316956533a6e1b9421fccf7461b25d88598f59faa9af40f48de180326b98302a15acde9d151e9ff7c4035a3f06bacb39f4fcaabe453112c469eec0c171
      },
    });
  }

  $("#login-btn").on("click", function() {
    login();
  });
});
```

涉及到的加密库以及完整代码，可以下载查看

## 参考资料

[腾讯云请求签名](https://cloud.tencent.com/document/product/436/7778)
