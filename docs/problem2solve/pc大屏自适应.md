# 大屏图表自适应

中后台需要用到图表的地方不少，有些还要做一个单独的图表页面展示在大屏幕上，以前基本都是定制的固定一个分辨率来做（1920\*1080），前段时间又遇到大屏在其他分辨率上显示的问题，临危受命用 transform scale 铺满了整个屏幕，但是拉伸变形了，经过研究后，可做做到不变形，图表占据在屏幕中央。

## css3 transform

对于大屏的适配主要采用 css3 的属性 [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)，主要用的是其中的 scale 属性来缩小和放大节点元素。
下面看一个例子：

```html
<body style="height:1080px;width:1920px;"></body>
```

当时固定的 1920\*1080 分辨率，后来紧急需求要在 7680\*2160 上看，于是我就暂时采用 scale 来直接放大页面来占满屏幕，

```html
<body
  style="height:1080px;width:1920px;transform: scale(4,2);transform-origin: left top;"
></body>
```

origin 是缩放基准点，根据节点元素左上角来放大，这种方法代码少，但是会稍微有点变形，下面这种方法不会变形，但是图表可能不会占满屏幕，会在屏幕的正中央，当然背景图是占满屏幕的，所以也不会留白

## js 结合 transform

先讲解下思路：

- 固定像素比定制的分辨率（一般是客户的页面分辨率这里采用 1920\*1080）得到 fixedScale=1920/1080
- 获取当前屏幕可视区域的宽、高,以及款高低 curWidth,curHeight
- 计算当前屏幕宽高比 curScale=curWidth/Height
- fixedScale 与 curScale 比较
- fixedScale < curScale，当前屏幕宽度过大，按高度比例缩放，宽度按比例移动到屏幕中央
- fixedScale > curScale 当前屏幕高度过大，按宽度比例缩放，高度按比例移动到屏幕中央

接下来是代码实现：

```js
//缩放实现
function zoomPage() {
  //获取当前屏幕可视宽、高
  var curWidth = $(window).width();
  var curHeight = $(window).height();
  var fixScale = 1920 / 1080; //当前屏幕像素比例
  var curScale = curWidth / curHeight; //当前屏幕宽度大于高度
  // curScale = screenHeight / screenWidth;
  if (fixScale <= curScale) {
    //以高度缩放 填满， 宽度按比例位移

    var scaleH = curHeight / 1080;

    //计算位移的大小：
    var translateW = (curWidth - 1920 * scaleH) / 2 / scaleH;

    $("#container").css(
      "transform",
      "scale(" + scaleH + ") translate(" + translateW + "px,0px)"
    );
  } else {
    //以宽度缩放 填满， 高度按比例位移
    var scaleW = curWidth / 1920;
    //计算位移的大小：
    var translateH = (curHeight - 1080 * scaleW) / 2 / scaleW;

    $("#container").css(
      "transform",
      "scale(" + scaleW + ") translate(0px," + translateH + "px)"
    );
  }
}
```

提取参数

```js
/**
 *@description 大屏缩放功能函数
 *@param {Object} {width height container}
 */
function zoomPage(option) {
  var default_opt = {
    width: 1920,
    height: 1080,
    container: "html"
  };

  var opt = $.extend(default_opt, option);
  var container = opt.container;
  //获取当前屏幕可视宽、高
  var curWidth = $(window).width();
  var curHeight = $(window).height();
  var fixScale = opt.width / opt.height; //当前屏幕像素比例
  var curScale = curWidth / curHeight; //当前屏幕宽度大于高度
  // curScale = screenHeight / screenWidth;
  if (fixScale <= curScale) {
    //以高度缩放 填满， 宽度按比例位移

    var scaleH = curHeight / opt.height;

    //计算位移的大小：
    var translateW = (curWidth - opt.width * scaleH) / 2 / scaleH;

    $(container).css(
      "transform",
      "scale(" + scaleH + ") translate(" + translateW + "px,0px)"
    );
  } else {
    //以宽度缩放 填满， 高度按比例位移
    var scaleW = curWidth / opt.width;
    //计算位移的大小：
    var translateH = (curHeight - opt.height * scaleW) / 2 / scaleW;

    $(container).css(
      "transform",
      "scale(" + scaleW + ") translate(0px," + translateH + "px)"
    );
  }
}
```
