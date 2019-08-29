# 操作 URL 的新 API

前端时间需求托管平台添加新功能，ng1 的 http 中 get 请求参数忘记怎么传了，内网怎么写都不对，于是也不写了，直接把所有参数写在 URL 后面算了。然后就用到了 URLSearchParams 这个 API

## 直接使用

```javaScript
 //现有网站url为："https://www.baidu.com/?q=URLUtils.searchParams&topic=api";
let paramsString=location.search
let searchParams = new URLSearchParams(paramsString);

//Iterate the search parameters.
for (let p of searchParams) {
  console.log(p);
}
// ["q", "URLUtils.searchParams"]
// ["topic", "api"]
```

## methods

这个 API 不继承任何其他方法，有自己的几个方法

- URLSearchParams.get() 获取单个查询参数的值

  `searchParams.get(q)`

- URLSearchParams.append() 添加一个字段
  `searchParams.append('name','fillter')`
- URLSearchParams.delete() 删除一个字段

  `searchParams.delete('name')`

- URLSearchParams.set() 设置一个字段

  `searchParams.delete('name','lal')`

- URLSearchParams.toString() 转换为字符串

  `searchParams.toString()`

## 实际应用

比如在 get 请求 url 后面添加参数，不用拼字符串了，直接一个对象 key value 的形式，然后调用 api 就能自动转换格式

```javaScript
    let search = {
        pageNum:1,
        pageSize:10,
        productid:1,
        name:"张三"
    };
    let  searchObj = new URLSearchParams(search);
    let searchParams = searchObj.toString(); //"pageNum=1&pageSize=10&productid=1"
    $http.get($scope.url+searchParams, search).success(function(data) {
        $scope.totalCount = data.total;
        params.total(data.total);
        $defer.resolve(data.list);
    });
```

上面是对象转成字符串，如果是字符串转换成对象

```javaScript
let paramsString = "pageNum=1&pageSize=10&productid=1";
let searchParams = new URLSearchParams(paramsString);

//Iterate the search parameters.
let urlObj={}
for (let [key,val] of searchParams) {
    urlObj[key]=val
}
```

原来对与操作 url 参数都是写正则，正则这个东西（每次去看都要费脑细胞），还是原生的 api 可读性高还易于维护，用着爽，还不会出错。
另外 axios 发送请求的时候如果是 FormData 格式的也要格式化一下，不然后台是收不到请求参数的，这时候就可以用这个 API
不过一般用的都是 qs 模块

## 思考

上面的介绍完了，可以考虑下这几个题的实现方式
已知：

```javaScript
let search = {
    pageNum:1,
    pageSize:10,
    productid:1,
    name:"张三"
};
```

1. 将 search 转成"pageNum=1&pageSize=10&productid=1&name=%E5%BC%A0%E4%B8%89"这种字符串
2. 将上面的字符串转成 search 这样的
3. "pageNum=1&pageSize=10&productid=1&productid=2&name=%E5%BC%A0%E4%B8%89"如果是这样有重复的键，则值以数组的方式呈现
